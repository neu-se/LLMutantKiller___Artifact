import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with index.html page normalization", () => {
  it("should return uplevel when link has trailing slash and page is index.html in subdirectory", () => {
    const result = gettype(
      "http://example.com/section/",
      "http://example.com/section/sub/index.html"
    );
    expect(result).toBe("uplevel");
  });
});