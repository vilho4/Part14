import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
  },

  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
