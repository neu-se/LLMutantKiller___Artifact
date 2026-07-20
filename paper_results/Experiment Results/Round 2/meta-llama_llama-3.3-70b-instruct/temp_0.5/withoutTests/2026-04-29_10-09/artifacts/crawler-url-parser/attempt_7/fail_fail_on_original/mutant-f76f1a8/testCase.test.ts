import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse the URL', () => {
    const url = "http://example.com/path/to/default.js";
    const parsedUrl = parse(url);
    expect(parsedUrl.path).toBe("/path/to/");
  });
});