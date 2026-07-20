import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel when page path ends with index.html and link is in same directory", () => {
    const pageUrl = "http://example.com/parent/child/index.html";
    const linkUrl = "http://example.com/parent/child/other.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});