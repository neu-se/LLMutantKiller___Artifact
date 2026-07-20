import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly handle paths with default.html in the middle when comparing with same path", () => {
    const linkUrl = "http://example.com/aaa/default.html/ccc";
    const pageUrl = "http://example.com/aaa/default.html/ddd";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});