import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function text accumulation', () => {
  it('should accumulate unique link texts for duplicate URLs', () => {
    const html = `
      <html><body>
        <a href="http://example.com/page">First Text</a>
        <a href="http://example.com/page">Second Text</a>
      </body></html>
    `;
    
    const results = extract(html, 'http://example.com/');
    const pageResult = results.find((r: any) => r.url && r.url.includes('/page'));
    
    expect(pageResult).toBeDefined();
    expect(pageResult.text).toContain('First Text');
    expect(pageResult.text).toContain('Second Text');
  });
});