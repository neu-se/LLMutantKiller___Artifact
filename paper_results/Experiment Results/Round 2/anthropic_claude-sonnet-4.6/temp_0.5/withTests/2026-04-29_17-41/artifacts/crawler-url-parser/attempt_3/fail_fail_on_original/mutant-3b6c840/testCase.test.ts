import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract deduplication with trailing slash URLs', () => {
  it('should deduplicate URLs where one has trailing slash and one does not', () => {
    const html = '<html><body><a href="http://www.example.com/page/">link1</a><a href="http://www.example.com/page">link2</a></body></html>';
    const result = extract(html, "http://www.example.com/");
    // With removeTrailingSlash: true, both URLs normalize to same URL and deduplicate
    // With removeTrailingSlash: false, they remain as different URLs
    expect(result.length).toBe(1);
  });
});