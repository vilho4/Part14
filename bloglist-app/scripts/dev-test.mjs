import dotenv from 'dotenv'
import { spawn } from 'node:child_process'

dotenv.config({ path: '.env.test' })

const child = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
  },
})

child.on('exit', (code) => {
  process.exit(code ?? 0)
})
