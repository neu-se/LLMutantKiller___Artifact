import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links when pageurl_path ends with index.html", () => {
    const linkUrl = "http://example.com/aaa/bbb/";
    const pageUrl = "http://example.com/aaa/bbb/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});