import { extract } from "../../../crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should filter out hrefs with invalid types', () => {
    const data = '<a href="">Link</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});