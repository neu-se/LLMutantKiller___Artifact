import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should extract URLs correctly', () => {
    const html = '<a href="http://example.com">Example</a><a href="http://example.com/subpage">Subpage</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe('http://example.com');
    expect(result[1].url).toBe('http://example.com/subpage');
  });

  it('should filter out URLs with length less than or equal to 3', () => {
    const html = '<a href="a">Example</a><a href="http://example.com">Example</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com');
  });
});