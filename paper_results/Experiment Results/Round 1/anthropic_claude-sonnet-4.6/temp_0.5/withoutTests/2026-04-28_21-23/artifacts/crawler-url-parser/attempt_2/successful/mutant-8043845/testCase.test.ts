import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should filter out href values that are too short (less than 3 characters)', () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="http://example.com/valid">Valid Link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, 'http://example.com');
    
    // In original code, href.length < 3 causes "ab" to be skipped
    // In mutated code (if false) return, "ab" would be processed and resolved against base URL
    // "ab" resolved against "http://example.com" would become "http://example.com/ab"
    const urls = result.map((r: any) => r.url);
    
    // The short href "ab" when resolved against base would produce a URL containing "/ab"
    // This should NOT appear in results with original code, but WILL appear with mutated code
    const hasShortHrefResolved = urls.some((url: string) => url && url.endsWith('/ab'));
    expect(hasShortHrefResolved).toBe(false);
  });
});