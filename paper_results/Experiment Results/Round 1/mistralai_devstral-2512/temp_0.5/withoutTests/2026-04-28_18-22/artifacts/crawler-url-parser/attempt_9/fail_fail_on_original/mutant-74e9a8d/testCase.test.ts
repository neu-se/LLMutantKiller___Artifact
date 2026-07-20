import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify sublevel when page URL ends with default.html and link is in subdirectory", () => {
    const pageUrl = "http://example.com/path/default.html";
    const linkUrl = "http://example.com/path/subdir/file";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});