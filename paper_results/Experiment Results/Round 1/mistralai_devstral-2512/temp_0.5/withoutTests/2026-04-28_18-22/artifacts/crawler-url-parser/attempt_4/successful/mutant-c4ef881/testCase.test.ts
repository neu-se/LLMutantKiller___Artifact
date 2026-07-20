import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' for paths with different parent directories", () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const pageUrl = "http://example.com/aaa/ddd/eee";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("internal");
  });
});