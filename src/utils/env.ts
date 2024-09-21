import { loadEnvConfig } from '@next/env'
import { z } from 'zod'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const envSchema = z.object({
  BCRYPT_SALT_ROUND: z.coerce.number().default(10),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables!')
}

export const env = _env.data