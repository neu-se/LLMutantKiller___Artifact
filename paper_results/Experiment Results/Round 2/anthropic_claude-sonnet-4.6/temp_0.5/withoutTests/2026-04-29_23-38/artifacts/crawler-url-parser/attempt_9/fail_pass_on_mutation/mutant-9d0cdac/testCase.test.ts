import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse mutation detection", () => {
  it("should treat a URL starting with two word chars and colon as having a protocol when baseUrl present", () => {
    // 'ht:' - 2 chars, matches \w+: but NOT \w:
    // Original: no prepend, URL.parse('ht://example.com') -> protocol='ht:', not http/https -> null
    // Mutated: prepends http:// -> 'http://ht://example.com'
    //   URL.parse('http://ht://example.com') -> protocol='http:', host='ht:'... 
    //   Actually let's check: host would be 'ht:' which has colon - invalid
    //   Node URL.parse is lenient - host might be 'ht:' 
    //   Then psl.parse('ht:') - the colon in host... 
    //   ret.host = 'ht:' -> psl.parse('ht:') -> might throw or return null domain
    //   If it throws, parse() would throw too, not return null
    // Let's verify with a URL that has a clean result in mutated
    const result = parse("ht://example.com", "http://base.com/");
    expect(result).toBeNull();
  });
});