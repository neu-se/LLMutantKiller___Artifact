import { extract } from "../../../crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should filter out hrefs with invalid types', () => {
    const data = '<a href="abc">Link</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com/abc');
  });
});