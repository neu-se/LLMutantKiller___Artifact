import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel when page URL ends with default.html and link is in same directory", () => {
    const pageUrl = "http://example.com/parent/default.html";
    const linkUrl = "http://example.com/parent/child";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});