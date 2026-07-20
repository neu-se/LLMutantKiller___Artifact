import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle paths with index.html when comparing same level", () => {
    const pageUrl = "http://example.com/path/index.html";
    const linkUrl = "http://example.com/path/sibling.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});