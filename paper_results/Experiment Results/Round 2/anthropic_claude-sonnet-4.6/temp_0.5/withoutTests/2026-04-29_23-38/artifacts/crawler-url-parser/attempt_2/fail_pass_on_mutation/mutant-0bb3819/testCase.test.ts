import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default path normalization", () => {
  it("should return sublevel for link with default.html when page has trailing slash path", () => {
    // pageurl path = /aaa/ (trailing slash preserved)
    // linkurl path = /aaa/bbb/default.html -> original: /aaa/bbb/, mutated: /aaa/bbb
    const result = gettype("http://example.com/aaa/bbb/default.html", "http://example.com/aaa/");
    expect(result).toBe("sublevel");
  });
});