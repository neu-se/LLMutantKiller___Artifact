import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return null when URL contains query parameters that should be removed', () => {
    const url = 'http://example.com/path?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale';
    const result = parse(url);
    expect(result.querycount).toBe(0);
  });
});