import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel when both paths end with index.html in same directory", () => {
    const pageUrl = "http://example.com/path/index.html";
    const linkUrl = "http://example.com/path/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});