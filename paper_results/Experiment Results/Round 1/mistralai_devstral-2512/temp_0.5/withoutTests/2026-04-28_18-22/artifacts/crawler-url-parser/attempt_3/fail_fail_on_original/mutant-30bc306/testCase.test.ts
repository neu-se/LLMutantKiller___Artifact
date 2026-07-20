import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links with index.htm", () => {
    const pageUrl = "http://example.com/path/index.htm";
    const linkUrl = "http://example.com/path/other.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});