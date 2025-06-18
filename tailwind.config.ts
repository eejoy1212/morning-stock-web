// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui"],
      },
    },
  },
  // ...
}

export default config
