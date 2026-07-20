import { parse } from '../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly remove query parameters', () => {
    const url = 'https://www.example.com/path?utm_source=google&utm_medium=cpc&ref=123';
    const result = parse(url);
    expect(result.search).not.toContain('utm_source');
    expect(result.search).not.toContain('ref');
  });
});