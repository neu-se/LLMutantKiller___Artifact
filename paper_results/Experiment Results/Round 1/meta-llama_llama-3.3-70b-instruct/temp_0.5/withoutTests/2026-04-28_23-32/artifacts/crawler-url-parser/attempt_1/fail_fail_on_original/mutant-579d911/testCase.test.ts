import { extract } from '../../../crawler-url-parser.js';

describe('extract function', () => {
  it('should filter out invalid hrefs', () => {
    const data = '<a href="javascript:void(0)">Link</a><a href="http://example.com">Valid Link</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com');
  });
});