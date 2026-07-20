import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse strips multi-character fragment from baseUrl', () => {
  it('should correctly resolve relative URL when baseUrl has a multi-character fragment', () => {
    // baseUrl has fragment "#ab" (2 chars after #)
    // Original: /#.*$/ strips "#ab" -> baseUrl = "http://www.example.com/aaa/bbb/ccc/"
    // Mutated: /#.$/ does NOT match "#ab" (2 chars, not 1) -> fragment remains
    // With fragment remaining, URL.resolve behaves differently
    const result = parse("ddd", "http://www.example.com/aaa/bbb/ccc/#ab");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/bbb/ccc/ddd");
  });
});