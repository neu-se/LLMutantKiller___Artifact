import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when pageurl path ends with default.htm", () => {
    const linkurl = "http://example.com/path";
    const pageurl = "http://example.com/path/default.htm";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});