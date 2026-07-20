import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract deduplication with index files', () => {
  it('should deduplicate index.htm and directory URL when removeDirectoryIndex is true', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/section/index.htm">section home</a>
          <a href="http://www.example.com/section/">section dir</a>
          <a href="http://www.example.com/other">other</a>
        </body>
      </html>
    `;
    const sourceUrl = 'http://www.example.com/page';
    const result = extract(html, sourceUrl);
    // With removeDirectoryIndex: true, index.htm normalizes to /, so 2 unique URLs
    // With removeDirectoryIndex: false, index.htm stays as-is, so 3 unique URLs
    expect(result.length).toBe(2);
  });
});