import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function - duplicate URL text handling', () => {
  it('should not duplicate text when the same text appears multiple times for the same URL', () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">Link Text</a>
          <a href="http://example.com/page">Link Text</a>
        </body>
      </html>
    `;
    
    const result = extract(html, 'http://example.com/');
    
    const page = result.find((r: any) => r.url === 'http://example.com/page');
    expect(page).toBeDefined();
    // In the original code, if text already includes the duplicate, it won't append again
    // In the mutated code (if (true)), it always appends, resulting in "Link Text Link Text"
    expect(page!.text).toBe('Link Text');
  });
});