import { useEffect, useRef, useState } from 'react';

/** @import { PointerEventHandler, RefObject } from 'react'*/

export function App() {
  const container = /** @type {RefObject<HTMLDivElement>} */ (useRef(/** @type {any} */ (null)));
  const history = /** @type {RefObject<[string, number][]>} */ (useRef([]));
  const moveExist = useRef(9);

  const [turn, setTurn] = useState('x');
  const [status, setStatus] = useState('play');
  const [currentTheme, setCurrentTheme] = useState(() => {
    return /** @type {any} */ (window).themeWatcher.current;
  });

  function checkWinCondition() {
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let result = 'play';

    const historyByTurn = /** @type {Record<string, number[]>} */ (
      history.current.reduce((acc, [turn, index]) => {
        if (!Object.hasOwn(acc, turn)) {
          /** @type {any} */ (acc)[turn] = [];
        }

        /** @type {any} */ (acc)[turn].push(index);

        return acc;
      }, /** @type {Record<string, number[]} */ {})
    );

    for (const turn in historyByTurn) {
      for (const condition of conditions) {
        if (condition.every(i => historyByTurn[turn].includes(i))) {
          return turn;
        }
      }
    }

    if (moveExist.current < 0) {
      return 'draw';
    }

    return result;
  }

  /**
   * @param {number} index
   * @returns {PointerEventHandler}
   */
  function handleClick(index) {
    return event => {
      if (status !== 'play' || history.current.some(([_, i]) => i === index)) {
        return;
      }

      const { currentTarget: element } = event;

      element.classList.add(turn === 'x' ? 'text-red' : 'text-blue');
      element.innerHTML = turn.toUpperCase();

      history.current.push([turn, index]);

      moveExist.current -= 1;

      const result = checkWinCondition();

      if (result === 'x' || result === 'o') {
        setStatus('win');
      } else if (result === 'draw') {
        setStatus('draw');
      } else {
        setTurn(turn === 'x' ? 'o' : 'x');
      }
    };
  }

  function handleReset() {
    history.current = [];
    moveExist.current = 8;

    setTurn('x');
    setStatus('play');

    [...container.current.children].forEach(element => {
      element.innerHTML = '';

      element.classList.remove('text-red');
      element.classList.remove('text-blue');
    });
  }

  function handleThemeToggle() {
    switch (currentTheme) {
      case 'auto':
        setCurrentTheme('light');

        break;
      case 'light':
        setCurrentTheme('dark');

        break;
      case 'dark':
        setCurrentTheme('auto');

        break;
    }
  }

  useEffect(() => {
    /** @type {any} */ (window).themeWatcher.update(currentTheme);
  }, [currentTheme]);

  return (
    <main className="min-h-full flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-900 mb-2">Simple Tic Tac Toe</h1>
        <h2 className="text-lg">
          {status === 'play'
            ? `${turn.toUpperCase()} Turn`
            : status === 'draw'
              ? 'Draw'
              : `${turn.toUpperCase()} Win`}
        </h2>
      </div>
      <div
        className="min-w-[240px] min-h-[240px] grid grid-rows-3 grid-cols-3 col-rule-dark-3 row-rule-dark-3 dark:col-rule-gray-5 dark:row-rule-gray-5"
        ref={container}
      >
        {Array.from({ length: 9 })
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-full h-full"
              id={`cell-${i}`}
              onPointerDown={handleClick(i)}
            ></div>
          ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center gap-2 text-white bg-black px-4 py-2 rounded-md select-none dark:text-light-8 dark:bg-dark-3"
          onPointerDown={handleReset}
        >
          Reset
        </button>
        <button
          className="inline-flex items-center gap-2 text-white bg-black px-4 py-2 rounded-md select-none dark:text-light-8 dark:bg-dark-3"
          onPointerDown={handleThemeToggle}
        >
          {currentTheme === 'auto' && (
            <>
              <div className="i-tabler-device-desktop"></div>Auto
            </>
          )}
          {currentTheme === 'light' && (
            <>
              <div className="i-tabler-sun"></div>Light
            </>
          )}
          {currentTheme === 'dark' && (
            <>
              <div className="i-tabler-moon"></div>Dark
            </>
          )}
        </button>
      </div>
    </main>
  );
}
