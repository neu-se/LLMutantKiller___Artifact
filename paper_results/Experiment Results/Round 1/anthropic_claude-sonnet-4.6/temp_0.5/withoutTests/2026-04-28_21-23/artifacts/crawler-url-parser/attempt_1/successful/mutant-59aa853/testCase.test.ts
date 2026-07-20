import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function - duplicate URL text accumulation', () => {
  it('should accumulate text from duplicate URLs when text is not already included', () => {
    // Create HTML with two links pointing to the same URL but with different text
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">First Link</a>
          <a href="http://example.com/page">Second Link</a>
        </body>
      </html>
    `;
    
    const sourceUrl = 'http://example.com/';
    const results = extract(html, sourceUrl);
    
    // Find the URL that appears twice
    const pageResult = results.find((r: any) => r.url && r.url.includes('example.com/page'));
    
    expect(pageResult).toBeDefined();
    // In the original code, when a duplicate URL is found and the text is not already included,
    // it appends the new text. So the text should contain both "First Link" and "Second Link".
    // In the mutated code (if (false)), the text is never appended, so it would only have "First Link".
    expect(pageResult!.text).toContain('First Link');
    expect(pageResult!.text).toContain('Second Link');
  });
});