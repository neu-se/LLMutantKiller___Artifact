import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with fragment', () => {
  it('should strip fragment correctly from base URL processing', () => {
    // baseUrlStr also has fragment removal: baseUrlStr = baseUrlStr.replace(/#.*$/, '');
    // The mutation only affects currentUrlStr first replacement
    // For currentUrlStr = "ddd" with baseUrlStr = "http://www.stackoverflow.com/aaa/bbb/ccc#section"
    // baseUrl fragment removal uses /#.*$/ (unchanged)
    // currentUrl first fragment removal is mutated
    // These should still be equivalent...
    const res = parse("ddd#fragment", "http://www.stackoverflow.com/aaa/bbb/ccc/");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ccc/ddd");
  });
});