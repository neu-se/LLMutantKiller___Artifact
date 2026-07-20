import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'samelevel' when paths differ only in the last part", () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const pageUrl = "http://example.com/aaa/bbb/ddd";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});