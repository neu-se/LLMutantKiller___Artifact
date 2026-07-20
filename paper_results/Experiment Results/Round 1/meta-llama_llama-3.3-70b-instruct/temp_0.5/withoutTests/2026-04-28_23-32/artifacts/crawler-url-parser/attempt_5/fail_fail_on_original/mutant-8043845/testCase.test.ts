import { extract } from '../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should filter out invalid hrefs', () => {
    const data = '<a href="javascript:void(0)">Invalid link</a><a href="https://www.example.com">Valid link</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.example.com');
  });
});