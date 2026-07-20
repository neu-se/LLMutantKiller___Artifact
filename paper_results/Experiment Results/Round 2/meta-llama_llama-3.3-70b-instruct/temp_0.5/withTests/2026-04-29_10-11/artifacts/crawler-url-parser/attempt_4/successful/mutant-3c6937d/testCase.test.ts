import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should extract URLs correctly', () => {
    const html = '<a href="abc">Example</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com/abc');
  });

  it('should filter out URLs with length less than 3', () => {
    const html = '<a href="ab">Example</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });
});