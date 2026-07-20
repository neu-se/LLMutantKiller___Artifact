// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('URL query parameter parsing with special characters', () => {
  it('should handle URL with query parameter containing underscore followed by non-word character', () => {
    const url = "http://example.com/path?utm_test=value&ref=other";
    const result = parse(url);
    expect(result.url).toBe("http://example.com/path?utm_test=value&ref=other");
    expect(result.search).toBe("?utm_test=value&ref=other");
    expect(result.querycount).toBe(2);
  });
});