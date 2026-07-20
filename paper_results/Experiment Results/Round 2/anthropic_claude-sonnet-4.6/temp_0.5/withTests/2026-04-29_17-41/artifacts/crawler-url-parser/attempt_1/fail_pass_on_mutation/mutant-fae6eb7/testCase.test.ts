import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should correctly resolve relative URL when baseUrl contains a fragment followed by end of string', () => {
    // The base URL has a fragment - both original and mutated strip it
    // But if baseUrl has a fragment with content after a newline character,
    // the behavior differs. Without $, #.* stops at \n; with $, same.
    // The real test: baseUrl with fragment should be stripped so relative URL resolves correctly
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    // After stripping fragment, baseUrl becomes "http://www.stackoverflow.com/aaa/bbb/ccc"
    // Then "ddd" resolves relative to that base
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});