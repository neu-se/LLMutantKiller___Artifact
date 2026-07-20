import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse mutation detection", () => {
  it("should resolve a bare word URL relative to baseUrl, not treat it as having a protocol", () => {
    // 'ab:80' looks like host:port to URL.parse when prepended with http://
    // Original: 'ab:' matches \w+:, no prepend; URL.parse('ab:80') -> protocol='ab:', not http -> null
    // Mutated: 'ab:' doesn't match \w:, prepends http:// -> URL.parse('http://ab:80')
    //          -> protocol='http:', host='ab:80', path=null -> returns non-null result
    const result = parse("ab:80", "http://base.com/");
    expect(result).toBeNull();
  });
});