import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html in page url', () => {
  it('should return internal when link path does not match page path after index normalization', () => {
    // pageurl has /aaa/index.html which normalizes to /aaa/ (original) or /aaa (mutant)
    // linkurl is /aaa2/bbb - has 2 parts, pageurl has 1 part, diff=1
    // original: "/aaa2/bbb".includes("/aaa/") = false -> "internal"
    // mutant:   "/aaa2/bbb".includes("/aaa") = true -> "sublevel"
    const result = gettype(
      "http://example.com/aaa2/bbb",
      "http://example.com/aaa/index.html"
    );
    expect(result).toBe("internal");
  });
});