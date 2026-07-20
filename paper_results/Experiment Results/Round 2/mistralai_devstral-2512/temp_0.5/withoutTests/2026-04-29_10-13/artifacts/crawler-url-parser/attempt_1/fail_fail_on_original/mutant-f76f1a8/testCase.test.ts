import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when pageurl path ends with 'default.a'", () => {
    const pageUrl = "http://example.com/path/default.a";
    const linkUrl = "http://example.com/path/default.a/sublink";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});