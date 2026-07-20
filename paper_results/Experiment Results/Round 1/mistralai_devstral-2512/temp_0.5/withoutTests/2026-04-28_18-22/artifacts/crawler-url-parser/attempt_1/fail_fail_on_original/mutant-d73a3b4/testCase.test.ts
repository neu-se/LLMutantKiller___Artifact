import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links with index.html in path", () => {
    const linkUrl = "http://example.com/path/index.html";
    const pageUrl = "http://example.com/path/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});