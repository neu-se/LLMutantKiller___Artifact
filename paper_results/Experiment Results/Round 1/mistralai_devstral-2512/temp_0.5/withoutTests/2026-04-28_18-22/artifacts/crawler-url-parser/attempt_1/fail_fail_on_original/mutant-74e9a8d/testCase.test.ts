import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when page URL ends with default.html", () => {
    const pageUrl = "http://example.com/path/default.html";
    const linkUrl = "http://example.com/path/sibling.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});