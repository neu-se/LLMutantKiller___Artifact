import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle paths with index.html in the middle followed by slash", () => {
    const linkUrl = "http://example.com/path/index.html/";
    const pageUrl = "http://example.com/path/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});