import { HashPwdMiddleware } from './hash-pwd.middleware';

describe('HashPwdMiddleware', () => {
  it('should be defined', () => {
    expect(new HashPwdMiddleware()).toBeDefined();
  });
});
