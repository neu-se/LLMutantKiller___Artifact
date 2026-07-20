import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'samelevel' when link and page are at the same directory level with trailing slash on page", () => {
    // pageurl has trailing slash: /aaa/bbb/
    // linkurl is at same level: /aaa/ccc
    // With original code: pageurl_without_last_part = "/aaa", linkurl_without_last_part = "/aaa" → "samelevel"
    // With mutated code: pageurl_without_last_part = "/aaa/", linkurl_without_last_part = "/aaa" → "internal" (not equal)
    const result = gettype(
      "http://example.com/aaa/ccc",
      "http://example.com/aaa/bbb/"
    );
    expect(result).toBe("samelevel");
  });
});