import bcrypt from 'bcrypt'
import { env } from './env'

export const encrypt = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUND)
  return bcrypt.hash(password, salt)
}

export const compare = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}


