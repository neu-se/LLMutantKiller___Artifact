import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links when pageurl has trailing slash", () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb/ddd/";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});