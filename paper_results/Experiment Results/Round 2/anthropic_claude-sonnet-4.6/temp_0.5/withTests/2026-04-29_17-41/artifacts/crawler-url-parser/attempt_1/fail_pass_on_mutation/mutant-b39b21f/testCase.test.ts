import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse result has correct default values', () => {
  it('should return an object with querycount of 0 when URL has no query string', () => {
    const result = parse("http://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(0);
  });
});