import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should filter out hrefs with length less than 3', () => {
    const html = `
      <html>
        <body>
          <a href="ab">Short link</a>
          <a href="http://example.com/valid">Valid link</a>
        </body>
      </html>
    `;
    
    // With base URL, "ab" would be resolved relative to base
    // Original: filtered because href.length < 3
    // Mutated: NOT filtered (length < 3 is true but regex doesn't match, so && is false)
    const result = extract(html, 'http://example.com/page/');
    
    // In original: only 1 result (the valid link)
    // In mutated: 2 results (short link resolved to http://example.com/page/ab + valid link)
    expect(result.length).toBe(1);
    expect(result[0].url).toContain('example.com/valid');
  });
});