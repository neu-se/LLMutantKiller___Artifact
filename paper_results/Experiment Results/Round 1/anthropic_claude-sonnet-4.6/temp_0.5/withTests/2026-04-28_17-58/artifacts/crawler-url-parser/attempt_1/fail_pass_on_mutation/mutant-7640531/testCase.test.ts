import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with fragment containing newline-like content', () => {
  it('should strip fragment from URL with protocol-relative URL starting with //', () => {
    // The first replace removes leading //, then the second replace removes #fragment
    // With //example.com/path#frag -> after first replace: example.com/path#frag
    // Both regexes handle this the same, but let's test the double-slash scenario
    // where after removing //, the remaining string has a # followed by content
    const res = parse("//www.google.com/path#section");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://www.google.com/path");
  });
});