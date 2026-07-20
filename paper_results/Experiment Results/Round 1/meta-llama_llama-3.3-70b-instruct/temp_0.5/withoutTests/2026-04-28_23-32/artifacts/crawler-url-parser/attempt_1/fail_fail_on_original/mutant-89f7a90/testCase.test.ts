import { parse } from '../../../crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct url object', () => {
    const currentUrlStr = 'https://www.npmjs.com/package/electron-window-manager';
    const baseUrlStr = 'https://www.npmjs.com/package/electron-window-manager#some-anchor';
    const result = parse(currentUrlStr, baseUrlStr);
    expect(result.url).toBe('https://www.npmjs.com/package/electron-window-manager');
    expect(result.baseurl).toBe('https://www.npmjs.com/package/electron-window-manager');
    expect(result.protocol).toBe('https:');
    expect(result.host).toBe('www.npmjs.com');
    expect(result.domain).toBe('npmjs');
    expect(result.subdomain).toBe('www');
    expect(result.path).toBe('/package/electron-window-manager');
    expect(result.search).toBe('');
    expect(result.querycount).toBe(0);
  });
});