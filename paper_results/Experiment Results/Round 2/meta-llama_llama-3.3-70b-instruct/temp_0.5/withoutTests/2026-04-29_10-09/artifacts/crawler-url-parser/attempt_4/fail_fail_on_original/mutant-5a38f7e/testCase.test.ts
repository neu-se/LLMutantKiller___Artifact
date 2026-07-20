import { gettype } from "./crawler-url-parser";

describe("crawler-url-parser", () => {
  it("should return correct type for same domain link", () => {
    const linkurl = "http://example.com/path";
    const pageurl = "http://example.com/path";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});