import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle href with javascript protocol and short length', () => {
    const html = '<a href="javascript:abc">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it('should handle href with mailto protocol and short length', () => {
    const html = '<a href="mailto:abc">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it('should handle href with ftp protocol and short length', () => {
    const html = '<a href="ftp:abc">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });
});