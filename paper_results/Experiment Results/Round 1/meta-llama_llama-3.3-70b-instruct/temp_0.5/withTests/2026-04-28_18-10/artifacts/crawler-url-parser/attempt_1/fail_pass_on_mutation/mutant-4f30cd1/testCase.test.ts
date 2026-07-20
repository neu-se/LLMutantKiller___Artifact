import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle href with javascript protocol', () => {
    const html = '<a href="javascript:void(0)">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it('should handle href with mailto protocol', () => {
    const html = '<a href="mailto:test@example.com">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it('should handle href with ftp protocol', () => {
    const html = '<a href="ftp://example.com">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it.skip('should handle href with short length', () => {
    const html = '<a href="a">Test</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
  });
});