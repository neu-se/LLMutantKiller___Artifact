import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL querycount', () => {
  it('should return querycount of 0 for URL without query string', () => {
    const result = parse("http://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(0);
    expect(result.search).toBeNull();
  });
});