export const HTTP_MESSAGE: { [key: number]: string } = {
  100: 'CONTINUE',
  101: 'SWITCHING_PROTOCOLS',
  102: 'PROCESSING',
  200: 'OK',
  201: 'CREATED',
  202: 'ACCEPTED',
  203: 'NON_AUTHORITATIVE_INFORMATION',
  204: 'NO_CONTENT',
  205: 'RESET_CONTENT',
  206: 'PARTIAL_CONTENT',
  207: 'MULTI_STATUS',
  300: 'MULTIPLE_CHOICES',
  301: 'MOVED_PERMANENTLY',
  302: 'MOVED_TEMPORARILY',
  303: 'SEE_OTHER',
  304: 'NOT_MODIFIED',
  305: 'USE_PROXY',
  307: 'TEMPORARY_REDIRECT',
  308: 'PERMANENT_REDIRECT',
  400: 'BAD_REQUEST',
  402: 'PAYMENT_REQUIRED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  500: 'INTERNAL_SERVER_ERROR',
};
