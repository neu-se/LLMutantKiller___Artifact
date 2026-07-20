import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function text assignment', () => {
  it('should include link text in extracted URL objects', () => {
    const html = '<html><body><a href="http://example.com/page1">Link Text</a></body></html>';
    const sourceUrl = 'http://example.com/';
    
    const results = extract(html, sourceUrl);
    
    const page1 = results.find((r: any) => r.url && r.url.includes('page1'));
    expect(page1).toBeDefined();
    expect(page1.text).toBe('Link Text');
  });
});