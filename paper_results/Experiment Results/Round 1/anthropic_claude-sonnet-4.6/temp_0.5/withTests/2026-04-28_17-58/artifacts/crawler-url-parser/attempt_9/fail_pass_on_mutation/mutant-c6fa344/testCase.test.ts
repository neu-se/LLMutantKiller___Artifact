import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should handle bare domain as source URL', () => {
    const html = '<a href="/page">link</a>';
    const result = extract(html, "google.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://google.com/page");
  });
});