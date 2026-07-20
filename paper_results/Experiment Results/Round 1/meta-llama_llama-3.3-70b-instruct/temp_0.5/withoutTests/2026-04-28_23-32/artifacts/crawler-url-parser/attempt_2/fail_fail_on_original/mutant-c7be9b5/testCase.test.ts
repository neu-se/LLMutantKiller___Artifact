import { parse } from "./crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should parse URL correctly', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe(url);
    expect(result.protocol).toBe('https:');
    expect(result.host).toBe('www.npmjs.com');
    expect(result.path).toBe('/package/electron-window-manager');
  });
});