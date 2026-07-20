import { parse } from "./crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse the URL', () => {
    const url = "http://example.com/path/to/index.html";
    const parsedUrl = parse(url);
    expect(parsedUrl.path).toBe("/path/to/");
  });
});