import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract with directory index URLs', () => {
  it('should handle index.html URLs in extracted links', () => {
    const html = '<a href="http://www.example.com/section/index.html">Section</a><a href="http://www.example.com/section/page.html">Page</a>';
    const result = extract(html, 'http://www.example.com/');
    // With removeDirectoryIndex: true, index.html link and /section/ would be deduplicated
    // With removeDirectoryIndex: false, they remain separate
    const urls = result.map((r: any) => r.url);
    expect(urls).toContain('http://www.example.com/section/index.html');
  });
});