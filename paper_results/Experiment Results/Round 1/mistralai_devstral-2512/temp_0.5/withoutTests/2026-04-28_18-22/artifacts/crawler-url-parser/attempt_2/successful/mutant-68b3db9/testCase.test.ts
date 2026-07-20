import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should handle anchor elements with whitespace in text content', () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/path">  Test Link  </a>
        </body>
      </html>
    `;
    const sourceUrl = 'https://example.com';
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('https://example.com/path');
    expect(result[0].text).toBe('Test Link');
  });
});