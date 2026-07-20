import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle paths with index.html not at end when determining relationship", () => {
    const linkUrl = "http://example.com/path/index.html/other";
    const pageUrl = "http://example.com/path/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});