import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse with protocol-like URL and baseUrl", () => {
  it("should return null for a URL with non-http multi-char protocol when baseUrl is provided", () => {
    // 'ws://example.com' - 'ws:' has 2 chars, matches \w+: in original
    // Original: condition false, no prepend; parsedUrl.protocol = 'ws:' -> returns null (not http/https)
    // Mutated: 'ws:' does NOT match \w: (single char only), condition true, 
    //          prepends http:// -> 'http://ws://example.com'
    //          URL.parse('http://ws://example.com') -> host='ws:', protocol='http:' -> non-null result
    const result = parse("ws://example.com", "http://base.com/");
    expect(result).toBeNull();
  });
});