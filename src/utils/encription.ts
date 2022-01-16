import * as crypto from 'crypto';

/**
 * 生成盐
 * @returns
 */
export function addSalt() {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * crypto加密
 * @param pwd 密码
 * @param salt 盐
 * @returns
 */
export function encript(pwd: string, salt: string): string {
  return crypto.pbkdf2Sync(pwd, salt, 10000, 16, 'sha256').toString('base64');
}
