import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly remove query parameters', () => {
    const url = 'https://www.example.com/path?utm_source=google&ref=123';
    const result = parse(url);
    expect(result.search).not.toContain('utm_source');
    expect(result.search).not.toContain('ref');
    expect(result.search).toBe('?');
  });
});