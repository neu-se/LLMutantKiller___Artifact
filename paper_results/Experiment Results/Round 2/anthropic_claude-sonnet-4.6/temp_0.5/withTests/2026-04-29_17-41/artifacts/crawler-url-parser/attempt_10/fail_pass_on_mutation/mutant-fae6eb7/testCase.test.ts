import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with sourceUrl containing fragment', () => {
  it('should extract URLs correctly when sourceUrl contains a fragment', () => {
    const html = '<html><body><a href="page2">link</a></body></html>';
    const result = extract(html, "http://www.example.com/aaa/bbb#section");
    expect(result).not.toBeNull();
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://www.example.com/aaa/page2");
  });
});