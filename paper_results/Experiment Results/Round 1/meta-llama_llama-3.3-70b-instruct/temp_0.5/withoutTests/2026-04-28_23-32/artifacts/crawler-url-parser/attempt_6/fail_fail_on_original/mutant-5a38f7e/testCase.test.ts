import { parse } from "./crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse a URL', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result.path).toBe('/package/electron-window-manager');
    expect(result.protocol).toBe('https:');
    expect(result.host).toBe('www.npmjs.com');
  });
});