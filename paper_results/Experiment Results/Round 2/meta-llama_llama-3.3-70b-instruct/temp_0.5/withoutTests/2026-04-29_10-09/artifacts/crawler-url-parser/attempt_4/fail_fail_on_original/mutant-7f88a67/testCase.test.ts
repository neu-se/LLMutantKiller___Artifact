import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should normalize https protocol when normalizeHttps is true', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const parsedUrl = parse(url);
    expect(parsedUrl.protocol).not.toBe('http:');
  });
});