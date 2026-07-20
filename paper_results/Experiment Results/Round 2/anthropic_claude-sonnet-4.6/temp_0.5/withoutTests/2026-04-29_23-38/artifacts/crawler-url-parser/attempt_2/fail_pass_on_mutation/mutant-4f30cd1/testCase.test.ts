import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should filter out mailto: links regardless of their length', () => {
    const html = `
      <html>
        <body>
          <a href="mailto:test@example.com">Email us</a>
          <a href="http://example.com/valid">Valid link</a>
        </body>
      </html>
    `;
    
    const result = extract(html, 'http://example.com');
    
    // mailto: links should be completely absent from results
    // In original code: filtered because it matches /^(javascript|mailto:|ftp:)/
    // In mutated code: NOT filtered because href.length >= 3, making the && condition false
    const hasMailtoLink = result.some((r: any) => r.url && r.url.startsWith('mailto:'));
    
    expect(hasMailtoLink).toBe(false);
    expect(result.length).toBe(1);
  });
});