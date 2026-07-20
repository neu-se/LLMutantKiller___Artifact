import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when link path ends with default.htm", () => {
    const pageUrl = "http://example.com/path/";
    const linkUrl = "http://example.com/path/default.htm";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});