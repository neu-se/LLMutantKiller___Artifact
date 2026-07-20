import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function with default.aspx path normalization", () => {
  it("should correctly classify link with default.aspx path when comparing with parent directory", () => {
    const pageUrl = "http://example.com/path/default.aspx";
    const linkUrl = "http://example.com/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});