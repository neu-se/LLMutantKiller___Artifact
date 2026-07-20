import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract', () => {
  it('should extract URLs from HTML with no source URL', () => {
    const html = '<a href="//google.com/page">link</a>';
    const result = extract(html);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://google.com/page");
  });
});