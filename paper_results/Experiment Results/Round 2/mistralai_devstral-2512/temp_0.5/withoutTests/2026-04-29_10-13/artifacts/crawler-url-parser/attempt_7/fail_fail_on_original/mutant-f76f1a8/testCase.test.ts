import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle paths ending with 'default.a' when comparing with parent path", () => {
    const pageUrl = "http://example.com/path/default.a";
    const linkUrl = "http://example.com/path";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});