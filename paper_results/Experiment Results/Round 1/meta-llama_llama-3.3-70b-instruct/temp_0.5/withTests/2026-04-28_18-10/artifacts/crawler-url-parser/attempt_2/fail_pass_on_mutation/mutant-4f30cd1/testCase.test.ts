import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle href with short length and javascript protocol', () => {
    const html = '<a href="javascript:">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it('should handle href with short length and mailto protocol', () => {
    const html = '<a href="mailto:">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it('should handle href with short length and ftp protocol', () => {
    const html = '<a href="ftp:">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it.skip('should handle href with short length and no protocol', () => {
    const html = '<a href="a">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
  });
});