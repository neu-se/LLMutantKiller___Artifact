import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel when path contains index.html followed by more segments", () => {
    const linkUrl = "http://example.com/path/index.html/more";
    const pageUrl = "http://example.com/path/more";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});