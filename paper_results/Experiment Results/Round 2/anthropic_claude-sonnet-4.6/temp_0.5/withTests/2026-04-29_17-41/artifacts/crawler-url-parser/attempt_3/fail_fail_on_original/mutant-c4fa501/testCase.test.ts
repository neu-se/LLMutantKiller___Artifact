import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with removeDirectoryIndex', () => {
  it('should deduplicate index.htm and directory URLs when removeDirectoryIndex is true', () => {
    const html = `<html><body>
      <a href="http://www.example.com/section/index.htm">link1</a>
      <a href="http://www.example.com/section/">link2</a>
    </body></html>`;
    const result = extract(html, 'http://www.example.com/');
    // With removeDirectoryIndex: true, both URLs normalize to the same URL
    // so only 1 unique URL should be extracted
    expect(result.length).toBe(1);
  });
});