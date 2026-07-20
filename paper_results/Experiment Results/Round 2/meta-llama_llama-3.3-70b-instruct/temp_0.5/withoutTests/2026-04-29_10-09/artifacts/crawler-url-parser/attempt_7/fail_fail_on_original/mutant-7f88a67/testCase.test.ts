import { parse } from "../../crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return https protocol when input is https', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const parsedUrl = parse(url);
    expect(parsedUrl.protocol).toBe('https:');
  });
});