import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' for different paths at same level", () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const pageUrl = "http://example.com/aaa/bbb/ddd";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});