import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' when paths differ by more than just the last part", () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc/ddd";
    const pageUrl = "http://example.com/aaa/bbb/eee";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});