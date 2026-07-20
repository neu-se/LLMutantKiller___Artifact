import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly remove query parameters in a case-insensitive manner', () => {
    const url = 'https://www.example.com/path?utm_source=google&UTM_source=google2&ref=123';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse result is null');
    }
    expect(result.search).not.toContain('utm_source');
    expect(result.search).not.toContain('UTM_source');
  });
});