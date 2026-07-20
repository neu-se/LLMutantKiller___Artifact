import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function - duplicate URL text handling', () => {
  it('should not duplicate text when the same link appears multiple times with the same text', () => {
    const html = `
      <html>
        <body>
          <a href="http://example.com/page">Link Text</a>
          <a href="http://example.com/page">Link Text</a>
          <a href="http://example.com/page">Link Text</a>
        </body>
      </html>
    `;
    
    const results = extract(html, 'http://example.com/');
    const targetUrl = results.find((r: any) => r.url && r.url.includes('example.com/page'));
    
    expect(targetUrl).toBeDefined();
    // In the original code, text is only appended if it's not already included
    // So "Link Text" appearing 3 times should NOT result in "Link Text Link Text Link Text"
    // It should remain "Link Text" since the text is already included
    expect(targetUrl!.text).toBe('Link Text');
  });
});