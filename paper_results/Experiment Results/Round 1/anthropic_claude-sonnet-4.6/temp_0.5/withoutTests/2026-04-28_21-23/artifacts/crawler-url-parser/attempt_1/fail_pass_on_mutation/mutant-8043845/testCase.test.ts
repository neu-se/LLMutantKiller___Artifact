import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should filter out javascript: protocol links', () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">Click me</a>
          <a href="http://example.com/valid">Valid Link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, 'http://example.com');
    
    // In original code, javascript: links are filtered out
    // In mutated code (if false) return, the filter is removed, so javascript: links would be processed
    const urls = result.map((r: any) => r.url);
    
    // The javascript: link should NOT be in the results
    const hasJavascriptLink = urls.some((url: string) => url && url.includes('javascript'));
    expect(hasJavascriptLink).toBe(false);
    
    // The valid link should be present
    const hasValidLink = urls.some((url: string) => url && url.includes('example.com/valid'));
    expect(hasValidLink).toBe(true);
  });
});