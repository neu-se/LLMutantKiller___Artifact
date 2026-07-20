import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const html = '<a href="abc">Link</a>';
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/abc');
  });
});