import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with http:// already present reaching the prepend branch', () => {
  it('should parse "aaa/bbb" correctly without double-inserting http://', () => {
    // The URL "aaa/bbb" has no protocol and no leading slash/dot
    // Original regex anchors at ^ so inserts http:// once at position 0
    // Mutated regex without ^ inserts at first match position - for "aaa/bbb"
    // the lookahead fails at position 0 giving same result, but for a URL
    // where the first char satisfies the lookahead differently...
    const result = parse("aaa/bbb");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://aaa/bbb");
  });
});