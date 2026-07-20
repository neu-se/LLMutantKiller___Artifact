import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse with two-character protocol and baseUrl", () => {
  it("should correctly parse a relative path URL that looks like it has a two-char protocol", () => {
    // 'ab' is a plain word - both original and mutated prepend http://
    // Try 'ab:path' where 'ab:' is 2 chars
    // Original: \w+: matches 'ab:', no prepend; URL.parse('ab:path') has protocol='ab:', not http/https -> null
    // Mutated: \w: does NOT match 'ab:', prepends http:// -> 'http://ab:path'
    //          URL.parse('http://ab:path') -> protocol='http:', host='ab', path='/path' -> non-null
    const result = parse("ab:path", "http://base.com/");
    expect(result).toBeNull();
  });
});