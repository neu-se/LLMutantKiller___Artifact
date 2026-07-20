import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should extract URLs correctly from HTML with base URL containing fragment', () => {
    const html = '<html><body><a href="/page2">Link</a></body></html>';
    const sourceUrl = 'http://example.com/page1#section';
    
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://example.com/page2');
  });
});