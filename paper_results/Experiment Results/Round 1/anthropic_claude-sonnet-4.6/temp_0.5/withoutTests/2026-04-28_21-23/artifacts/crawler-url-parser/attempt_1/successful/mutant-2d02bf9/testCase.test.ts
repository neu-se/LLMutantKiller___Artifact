import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should concatenate text from duplicate URLs', () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">First Text</a>
          <a href="http://example.com/page">Second Text</a>
        </body>
      </html>
    `;
    
    const result = extract(html, 'http://example.com/');
    
    const pageLink = result.find((item: any) => item.url && item.url.includes('example.com/page'));
    
    expect(pageLink).toBeDefined();
    expect(pageLink!.text).toContain('First Text');
    expect(pageLink!.text).toContain('Second Text');
  });
});