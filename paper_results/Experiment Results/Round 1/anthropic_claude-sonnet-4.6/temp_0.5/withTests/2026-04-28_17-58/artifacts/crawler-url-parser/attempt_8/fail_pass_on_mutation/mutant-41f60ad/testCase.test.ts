import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL against base with query string', () => {
  it('should not carry over base URL query string to relative URL without query', () => {
    const result = parse("page", "http://www.example.com/dir/?x=1");
    expect(result).not.toBeNull();
    expect(result.search).toBeNull();
    expect(result.querycount).toBe(0);
    expect(result.url).toBe("http://www.example.com/dir/page");
  });
});