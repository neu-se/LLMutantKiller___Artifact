import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract type classification with index pages", () => {
  it("should classify link as sublevel when page is index.html and link is in subdirectory", () => {
    const html = `<a href="http://example.com/section/sub/index.html">link</a>`;
    const sourceUrl = "http://example.com/section/index.html";
    const results = extract(html, sourceUrl);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].type).toBe("sublevel");
  });
});