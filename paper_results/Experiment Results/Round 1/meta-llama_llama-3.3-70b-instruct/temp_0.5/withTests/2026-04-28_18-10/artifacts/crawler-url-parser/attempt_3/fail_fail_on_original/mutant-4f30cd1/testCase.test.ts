import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle href with short length and no protocol', () => {
    const html = '<a href="a">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com/a');
  });

  it('should handle href with short length and no protocol, and baseUrl with trailing slash', () => {
    const html = '<a href="a">Test</a>';
    const baseUrl = 'http://example.com/';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com/a');
  });

  it('should handle href with short length and no protocol, and baseUrl without trailing slash', () => {
    const html = '<a href="a">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com/a');
  });
});