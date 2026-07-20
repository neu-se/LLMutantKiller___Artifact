import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('detect placeholder mutation via extract', () => {
  it('should extract URLs from HTML with protocol-relative hrefs without a source URL', () => {
    const html = '<html><body><a href="//www.example.com/page">link</a></body></html>';
    const result = extract(html, "//www.example.com");
    expect(result).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].url).toBe("http://www.example.com/page");
  });
});