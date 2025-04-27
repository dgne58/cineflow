module.exports = {
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "components-badges-backgrounds-BG-color-2":
            "var(--components-badges-backgrounds-BG-color-2)",
          "components-badges-text-text-dark":
            "var(--components-badges-text-text-dark)",
          "components-cards-borders-BR-color-2":
            "var(--components-cards-borders-BR-color-2)",
          "dark-navi": "var(--dark-navi)",
          "globals-global-borders-border-3":
            "var(--globals-global-borders-border-3)",
          "globals-global-surfaces-surface-2":
            "var(--globals-global-surfaces-surface-2)",
          "globals-global-texts-color-4": "var(--globals-global-texts-color-4)",
          "light-purple": "var(--light-purple)",
          "pink-purple": "var(--pink-purple)",
          "pure-white": "var(--pure-white)",
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        fontFamily: {
          "body-base": "var(--body-base-font-family)",
          "body-small": "var(--body-small-font-family)",
          "display-1-medium": "var(--display-1-medium-font-family)",
          h1: "var(--h1-font-family)",
          h2: "var(--h2-font-family)",
          "single-line-body-base": "var(--single-line-body-base-font-family)",
          subheading: "var(--subheading-font-family)",
          text: "var(--text-font-family)",
          sans: [
            "ui-sans-serif",
            "system-ui",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
          ],
        },
        boxShadow: {
          "neutral-BS-regular": "var(--neutral-BS-regular)",
          "neutral-BS-small": "var(--neutral-BS-small)",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
      container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    },
    plugins: [],
    darkMode: ["class"],
  };
  