import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function - duplicate URL text accumulation', () => {
  it('should accumulate text from duplicate URLs when text is different', () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">First Link</a>
          <a href="http://example.com/page">Second Link</a>
        </body>
      </html>
    `;
    
    const results = extract(html, 'http://example.com/');
    
    const pageLink = results.find((r: any) => r.url && r.url.includes('example.com/page'));
    
    expect(pageLink).toBeDefined();
    // In the original code, when a duplicate URL is found and the text is not already included,
    // it appends the new text. So "First Link" + " " + "Second Link" = "First Link Second Link"
    // In the mutated code (if false), the text never gets appended, so it stays as "First Link"
    expect(pageLink!.text).toBe('First Link Second Link');
  });
});