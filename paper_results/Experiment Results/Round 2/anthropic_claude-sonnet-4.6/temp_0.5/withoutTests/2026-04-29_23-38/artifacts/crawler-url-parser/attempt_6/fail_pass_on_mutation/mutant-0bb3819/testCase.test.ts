import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with default path normalization", () => {
  it("should return uplevel when linkurl default.html normalizes to path that pageurl contains with trailing slash", () => {
    // linkurl_path = /aaa/default.html -> original: /aaa/, mutated: /aaa
    // pageurl_path = /aaa/bbb/ccc (no default, no trailing slash)
    // linkurl_parts = ['aaa'], pageurl_parts = ['aaa','bbb','ccc']
    // diff = 1-3 = -2, not -1, so won't hit uplevel check
    // Try pageurl with exactly 2 parts:
    // pageurl_path = /aaa/bbb
    // diff = 1-2 = -1
    // pageurl_path.includes('/aaa/') = /aaa/bbb.includes('/aaa/') = true (original) -> uplevel
    // pageurl_path.includes('/aaa') = /aaa/bbb.includes('/aaa') = true (mutated) -> uplevel
    // Same! Because /aaa/ is prefix of /aaa/bbb
    // Need pageurl_path where /aaa/ is NOT a substring but /aaa is
    // That means pageurl_path contains /aaa but next char is not /
    // e.g. /aaa (end of string) or /aaab
    // /aaa: diff would be 1-1=0, not -1
    // Need pageurl to have 2 parts and contain /aaa but not /aaa/
    // e.g. /bbb/aaa: diff=1-2=-1, /bbb/aaa.includes('/aaa/')=false, /bbb/aaa.includes('/aaa')=true
    const result = gettype(
      "http://example.com/aaa/default.html",
      "http://example.com/bbb/aaa/page.html"
    );
    expect(result).toBe("internal");
  });
});