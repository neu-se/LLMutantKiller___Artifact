import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly classify when path contains index.html in middle of path", () => {
    const linkUrl = "http://example.com/path/index.html/extra";
    const pageUrl = "http://example.com/path/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});