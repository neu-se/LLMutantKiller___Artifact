import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract mutation detection', () => {
  it('should correctly extract and count URLs from HTML with base tag using // protocol', () => {
    const html = `<html><head><base href="//example.com/"></head><body>
      <a href="page1">link1</a>
      <a href="//other.com/page">link2</a>
    </body></html>`;
    const result = extract(html, "http://example.com/");
    expect(result.length).toBe(2);
  });
});