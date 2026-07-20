import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should extract and resolve URLs correctly when page URL has fragment', () => {
    const html = `<html><body>
      <a href="http://example.com/page#section">Link</a>
    </body></html>`;
    
    const result = extract(html, 'http://example.com/');
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com/page');
  });
});