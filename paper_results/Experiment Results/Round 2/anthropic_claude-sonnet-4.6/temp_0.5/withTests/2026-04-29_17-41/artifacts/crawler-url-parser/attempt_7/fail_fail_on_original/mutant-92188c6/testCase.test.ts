import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with plus sign in query string', () => {
  it('should handle plus signs in query strings of relative URLs', () => {
    const result = parse("ddd?q=a+b", "http://www.example.com/aaa/bbb/");
    expect(result).not.toBeNull();
    // Original (true): + decoded to space, re-encoded as %20 -> ?q=a%20b
    // Mutant (false): + preserved via search string -> ?q=a+b
    expect(result!.search).toBe("?q=a%20b");
  });
});