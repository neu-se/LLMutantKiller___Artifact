import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function', () => {
  it('should handle anchor tags without href attribute without throwing an error', () => {
    const html = `
      <html>
        <body>
          <a>No href link</a>
          <a href="http://example.com/page">Valid link</a>
        </body>
      </html>
    `;
    
    // In the original code, undefined href is handled gracefully
    // In the mutated code, accessing href.length when href is undefined throws TypeError
    expect(() => {
      const result = extract(html, 'http://example.com');
      // Should return array with only the valid link
      expect(result).toHaveLength(1);
      expect(result[0].url).toContain('example.com/page');
    }).not.toThrow();
  });
});