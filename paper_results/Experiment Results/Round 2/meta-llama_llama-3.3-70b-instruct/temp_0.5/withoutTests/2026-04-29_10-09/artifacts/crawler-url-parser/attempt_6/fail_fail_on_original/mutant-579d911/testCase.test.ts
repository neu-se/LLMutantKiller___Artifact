import { extract } from '../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should filter out invalid hrefs', () => {
    const html = '<a href="javascript:void(0)">Link</a><a href="a">Invalid Link</a><a href="https://example.com">Valid Link</a>';
    const result = extract(html, 'https://example.com');
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://example.com');
  });
});