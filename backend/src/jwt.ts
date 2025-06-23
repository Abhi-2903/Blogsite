
import { sign as jwtSign, verify as jwtVerify } from 'hono/jwt'

/**
 * Sign a JWT token with a payload and secret
 * @param payload - Object to encode in the token (e.g., { id: user.id })
 * @param secret - JWT secret key (e.g., c.env.JWT_SECRET)
 * @returns JWT token as a string
 */
export async function sign(payload: object, secret: string): Promise<string> {
      //@ts-ignore
  return await jwtSign(payload, secret)
}

/**
 * Verify a JWT token using the secret key
 * @param token - JWT token from headers
 * @param secret - JWT secret key
 * @returns Decoded payload (e.g., { id: 1, iat: ... }) or throws error if invalid
 */
export async function verify(token: string, secret: string): Promise<any> {
  return await jwtVerify(token, secret)
}
