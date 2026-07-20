import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse returns object with null default values', () => {
  it('should return an object with querycount defaulting to 0 when URL has no query string', () => {
    const result = parse("http://www.google.com/");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(0);
  });
});