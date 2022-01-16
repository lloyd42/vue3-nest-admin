/**
 * 请求响应报文
 */
export interface IResponse {
  code: number; //0 成功
  msg: string | object;
}
