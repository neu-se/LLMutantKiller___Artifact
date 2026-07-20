import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should use the actual link text when text is not null', () => {
    const html = '<html><body><a href="http://example.com/page">Hello World</a></body></html>';
    const sourceUrl = 'http://example.com/';
    
    const results = extract(html, sourceUrl);
    
    const link = results.find((r: any) => r.url === 'http://example.com/page');
    expect(link).toBeDefined();
    expect(link.text).toBe('Hello World');
  });
});