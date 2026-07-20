import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should parse a URL and not throw an error', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    expect(() => parse(url)).not.toThrow();
  });
});