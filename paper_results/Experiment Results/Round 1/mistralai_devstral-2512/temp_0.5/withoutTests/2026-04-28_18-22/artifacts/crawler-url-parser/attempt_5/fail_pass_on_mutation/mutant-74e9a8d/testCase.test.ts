import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify uplevel when comparing paths with default.html", () => {
    const pageUrl = "http://example.com/path/subpath/default.html";
    const linkUrl = "http://example.com/path/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});