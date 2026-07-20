import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should remove query parameters that match the specified regex in the original code', () => {
    const url = 'http://example.com/path?utm_source=google&utm_medium=cpc&foo=bar';
    const result = parse(url);
    expect(result.search).not.toContain('utm_source');
    expect(result.search).not.toContain('utm_medium');
    expect(result.search).toContain('foo');
  });
});