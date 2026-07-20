import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse mutation detection", () => {
  it("should handle URL with two-char protocol-like prefix differently based on regex", () => {
    // Original: 'to:' matches \w+:, no http:// prepended
    // URL.parse('to:path') -> protocol='to:', host=null -> resolves against base
    // URL.resolve('http://base.com/', 'to:path') -> 'to:path' (resolve keeps absolute protocol)
    // Then parsedUrl.protocol = 'to:' -> not http/https -> returns null
    //
    // Mutated: 'to:' doesn't match \w:, prepends http:// -> 'http://to:path'  
    // URL.parse('http://to:path') -> protocol='http:', host='to', path='/path'
    // host is not null, no base resolution needed
    // psl.parse('to') -> domain=null, subdomain=null
    // Returns non-null result with host='to'
    const result = parse("to:path", "http://base.com/");
    expect(result).toBeNull();
  });
});