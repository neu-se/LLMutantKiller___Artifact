import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('mutation detection for regex w+ vs w', () => {
  it('should resolve a protocol-relative looking URL correctly with baseUrl', () => {
    // "ab:relative" with baseUrl
    // Original \w+: matches "ab:" -> treated as protocol -> URL.parse sees protocol "ab:" 
    //   -> not http/https -> null
    // Mutated \w: does NOT match "ab:" -> http:// prepended -> "http://ab:relative"
    //   -> URL.parse: host="ab", port invalid -> host=null -> resolves against base
    //   -> result is NOT null
    // So original=null, mutated=non-null
    const result = parse("ab:relative", "http://www.example.com/path/");
    expect(result).toBeNull();
  });
});