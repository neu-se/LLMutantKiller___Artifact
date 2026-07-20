import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should remove query parameters that match the specified regex', () => {
    const url = 'http://example.com/path?utm_source=google&utm_medium=cpc';
    const result = parse(url);
    expect(result.querycount).toBe(0);
  });
});