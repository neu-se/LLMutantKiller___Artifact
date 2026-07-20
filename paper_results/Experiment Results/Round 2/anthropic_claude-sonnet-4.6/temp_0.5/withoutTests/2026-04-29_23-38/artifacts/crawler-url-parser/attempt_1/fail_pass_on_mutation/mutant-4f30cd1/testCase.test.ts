import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should filter out javascript: links from extracted URLs', () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="http://example.com/page">Valid link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, 'http://example.com');
    
    // The javascript: link should be filtered out
    const urls = result.map((r: any) => r.url);
    const hasJavascriptLink = urls.some((url: string) => url && url.includes('javascript'));
    
    expect(hasJavascriptLink).toBe(false);
    // Only the valid link should be present
    expect(result.length).toBe(1);
    expect(result[0].url).toContain('example.com/page');
  });
});