import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly handle paths with default.html in the middle when comparing with parent path", () => {
    const linkUrl = "http://example.com/aaa/default.html";
    const pageUrl = "http://example.com/aaa/default.html/ccc";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});