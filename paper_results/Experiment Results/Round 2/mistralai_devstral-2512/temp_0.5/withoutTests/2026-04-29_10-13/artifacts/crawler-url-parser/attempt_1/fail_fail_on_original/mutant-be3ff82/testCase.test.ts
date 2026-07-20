import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links with index.html in path", () => {
    const pageUrl = "http://example.com/path/index.html";
    const linkUrl = "http://example.com/path/other.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});