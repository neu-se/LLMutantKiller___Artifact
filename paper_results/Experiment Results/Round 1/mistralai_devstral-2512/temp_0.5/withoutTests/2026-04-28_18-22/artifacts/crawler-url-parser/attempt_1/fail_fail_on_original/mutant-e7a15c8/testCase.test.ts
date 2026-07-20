import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links with trailing slash in pageurl", () => {
    const linkurl = "http://example.com/aaa/bbb/";
    const pageurl = "http://example.com/aaa/bbb/ccc/";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});