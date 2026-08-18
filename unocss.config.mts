import { defineConfig, presetIcons, presetMini, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Geist'
        }
      }
    })
  ],
  rules: [
    [
      /^col-rule-(.+)$/,
      ([, color], { theme }) => {
        const parts = color.split('-');

        let value = theme.colors?.[color];

        if (!value && parts.length === 2) {
          value = theme.colors?.[parts[0]]?.[parts[1]];
        }

        if (!value) return;

        return {
          'column-rule': `1px solid ${value}`
        };
      }
    ],
    [
      /^row-rule-(.+)$/,
      ([, color], { theme }) => {
        const parts = color.split('-');

        let value = theme.colors?.[color];

        if (!value && parts.length === 2) {
          value = theme.colors?.[parts[0]]?.[parts[1]];
        }

        if (!value) return;

        return {
          'row-rule': `1px solid ${value}`
        };
      }
    ]
  ]
});
