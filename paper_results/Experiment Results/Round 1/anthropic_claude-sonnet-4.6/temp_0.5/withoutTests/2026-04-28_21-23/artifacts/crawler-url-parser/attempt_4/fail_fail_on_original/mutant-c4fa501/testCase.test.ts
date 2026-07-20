import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract deduplication with index.html', () => {
  it('should deduplicate index.html and directory URLs when removeDirectoryIndex is true', () => {
    const html = `
      <a href="/section/index.html">Link 1</a>
      <a href="/section/">Link 2</a>
    `;
    const result = extract(html, 'http://www.example.com/');
    // With removeDirectoryIndex: true, both URLs normalize to same URL -> 1 result
    // With removeDirectoryIndex: false, they remain different -> 2 results
    expect(result.length).toBe(1);
  });
});