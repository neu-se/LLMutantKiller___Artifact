import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should deduplicate URLs where one has trailing slash and one does not based on removeTrailingSlash setting", () => {
    const html = '<a href="http://example.com/page/">Link 1</a><a href="http://example.com/page">Link 2</a>';
    const result = extract(html, "http://example.com");
    // With removeTrailingSlash: true, both URLs normalize to same -> 1 result
    // With removeTrailingSlash: false, they remain different -> 2 results
    expect(result.length).toBe(1);
  });
});