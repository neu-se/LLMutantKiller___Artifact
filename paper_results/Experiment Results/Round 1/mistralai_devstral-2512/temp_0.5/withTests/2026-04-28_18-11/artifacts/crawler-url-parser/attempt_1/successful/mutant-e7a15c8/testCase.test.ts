import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly identify samelevel URLs with trailing slashes", () => {
    const linkUrl = "http://example.com/aaa/bbb/";
    const pageUrl = "http://example.com/aaa/ccc/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});