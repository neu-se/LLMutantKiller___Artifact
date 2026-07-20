import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should filter out invalid hrefs', () => {
    const html = '<a href="http://example.com">Valid Link</a><a href="javascript:void(0)">Invalid Link</a>';
    const result = extract(html, 'http://example.com');
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com');
    const html2 = '<a href="">Empty Link</a>';
    const result2 = extract(html2, 'http://example.com');
    expect(result2.length).toBe(0);
  });
});