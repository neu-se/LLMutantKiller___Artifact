import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel when paths differ only by index.html in the middle of path", () => {
    const linkUrl = "http://example.com/path/index.html/other";
    const pageUrl = "http://example.com/path/other";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});