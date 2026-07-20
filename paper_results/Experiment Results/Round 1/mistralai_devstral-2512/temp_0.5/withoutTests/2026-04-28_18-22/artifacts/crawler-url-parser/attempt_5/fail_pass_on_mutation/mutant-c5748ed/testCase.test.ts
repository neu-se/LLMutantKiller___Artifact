import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel when pageurl ends with index.html and linkurl is parent directory", () => {
    const linkUrl = "http://example.com/aaa/";
    const pageUrl = "http://example.com/aaa/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});