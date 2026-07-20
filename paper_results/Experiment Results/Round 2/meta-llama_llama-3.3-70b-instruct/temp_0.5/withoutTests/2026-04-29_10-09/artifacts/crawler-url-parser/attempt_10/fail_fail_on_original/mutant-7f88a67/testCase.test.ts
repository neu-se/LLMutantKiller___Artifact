import { parse } from '../../crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should return https protocol when input is https and normalizeHttps is false', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const parsedUrl = parse(url);
    expect(parsedUrl.protocol).toBe('https:');
  });
});