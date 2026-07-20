import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with base tag having protocol-relative url', () => {
  it('should correctly extract urls when base tag has protocol-relative href', () => {
    const html = '<html><head><base href="//example.com/path/"></head><body><a href="page">link</a></body></html>';
    const result = extract(html, "http://example.com/");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].url).toBe("http://example.com/path/page");
  });
});