import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrlStr containing a multi-character fragment', () => {
  it('should strip multi-character fragment from baseUrlStr when resolving relative URLs', () => {
    // baseUrlStr has a fragment with more than one character: "#section1"
    // Original: /#.*$/ strips "#section1" entirely -> baseUrlStr becomes "http://www.example.com/aaa/bbb"
    // Mutated:  /#.$/ only matches "#" + exactly one char at end -> won't match "#section1" -> fragment remains
    // This causes incorrect URL resolution for relative paths
    const result = parse("ddd", "http://www.example.com/aaa/bbb#section1");
    // With original code, baseUrlStr is cleaned to "http://www.example.com/aaa/bbb"
    // and "ddd" resolves relative to that -> "http://www.example.com/aaa/ddd"
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/ddd");
  });
});