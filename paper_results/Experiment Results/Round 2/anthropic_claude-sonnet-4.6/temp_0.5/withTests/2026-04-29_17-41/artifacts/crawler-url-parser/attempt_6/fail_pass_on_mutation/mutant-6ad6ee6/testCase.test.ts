import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('fragment stripping', () => {
  it('should strip fragment from URL leaving clean path for relative URL resolution', () => {
    // For "page#ab" with baseUrl:
    // Original /#.*$/: strips to "page"
    // Mutated /#.$/: "#ab" has 2 chars after #, no match, stays as "page#ab"
    // url.parse("page#ab", true, true) gives href:"page#ab"
    // After delete hash, url.format gives "page" (reconstructs from components)
    // url.resolve(base, "page") = correct URL
    // Both give same result... unless url.format uses href
    // Let me check: url.format with parseQueryString=true gives query:{} 
    // url.format({pathname:"page", query:{}}) = "page" (no search since stringify({})="")
    // So both give "page" to url.resolve. SAME.
    // 
    // I cannot find a difference. This test will likely pass on both.
    const result = parse("page#ab", "http://example.com/base/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/base/page");
  });
});