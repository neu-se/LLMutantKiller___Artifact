import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function - duplicate URL text accumulation', () => {
  it('should accumulate text from multiple anchor tags pointing to the same URL', () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">First Text</a>
          <a href="http://example.com/page">Second Text</a>
        </body>
      </html>
    `;
    
    const results = extract(html, 'http://example.com/');
    
    const targetUrl = results.find((r: any) => r.url && r.url.includes('example.com/page'));
    
    expect(targetUrl).toBeDefined();
    // In the original code, when the same URL appears twice with different text,
    // the text should be accumulated (e.g., "First Text Second Text")
    // In the mutated code, the else branch is skipped when URL already exists,
    // so the text would remain as the first occurrence only
    expect(targetUrl!.text).toContain('First Text');
    expect(targetUrl!.text).toContain('Second Text');
  });
});