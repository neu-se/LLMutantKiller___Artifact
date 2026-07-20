import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly remove query parameters in a case-insensitive manner', () => {
    const url = 'https://www.example.com/path?utm_source=google&ref=123';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse result is null');
    }
    expect(result.search).not.toContain('utm_source');
    expect(result.search).not.toContain('ref');
    expect(result.search).toBe('?');
  });

  it('should correctly remove query parameters in a case-insensitive manner for uppercase UTM', () => {
    const url = 'https://www.example.com/path?UTM_source=google&ref=123';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse result is null');
    }
    expect(result.search).not.toContain('UTM_source');
    expect(result.search).not.toContain('ref');
    expect(result.search).toBe('?');
  });
});