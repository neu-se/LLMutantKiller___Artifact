import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links when both paths end with index.html", () => {
    const pageUrl = "http://example.com/path/index.html";
    const linkUrl = "http://example.com/path/other.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});