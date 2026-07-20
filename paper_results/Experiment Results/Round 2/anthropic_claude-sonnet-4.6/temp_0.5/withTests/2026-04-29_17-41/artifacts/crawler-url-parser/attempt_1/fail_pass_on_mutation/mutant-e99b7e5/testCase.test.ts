import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract text for links with empty text content', () => {
  it('should return empty string for link text when anchor has no text content', () => {
    const html = '<html><body><a href="http://www.example.com/page">   </a></body></html>';
    const result = extract(html, 'http://www.example.com/');
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].text).toBe('');
  });
});