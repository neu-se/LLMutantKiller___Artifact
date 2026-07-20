import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly handle paths ending with default.html when comparing with parent path", () => {
    const linkUrl = "http://example.com/aaa/bbb/default.html";
    const pageUrl = "http://example.com/aaa/bbb";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});