import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse strips fragment from baseUrlStr correctly', () => {
  it('should correctly resolve relative URL when baseUrlStr has a two-character fragment', () => {
    // baseUrlStr ends with "#ab" (exactly 2 chars after #)
    // Original /#.*$/ removes "#ab" entirely -> baseUrlStr = "http://www.example.com/aaa/bbb"
    // Mutated /#.$/ matches "#b" (# + one char at end) -> removes "#b", leaving "http://www.example.com/aaa/bbb#a"
    // The "#a" fragment in baseUrlStr causes URL.parse to treat it differently
    // "ddd" resolved against "http://www.example.com/aaa/bbb#a" -> "http://www.example.com/aaa/ddd"
    // but baseurl stored in ret.baseurl will differ
    const result = parse("ddd", "http://www.example.com/aaa/bbb#ab");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.example.com/aaa/bbb");
  });
});