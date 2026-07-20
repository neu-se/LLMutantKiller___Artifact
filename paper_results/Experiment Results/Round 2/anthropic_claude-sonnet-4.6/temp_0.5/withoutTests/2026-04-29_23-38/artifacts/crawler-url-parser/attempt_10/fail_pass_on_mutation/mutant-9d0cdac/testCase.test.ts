import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse mutation detection", () => {
  it("should preserve the host of an absolute https URL when baseUrl is provided", () => {
    // Original: 'https:' matches \w+:, no prepend, URL parses correctly -> host='example.com'
    // Mutated: 'https:' doesn't match \w:, prepends http:// -> 'http://https://example.com/page'
    //   URL.parse('http://https://example.com/page') -> host='https:', path='//example.com/page'
    //   host is 'https:' not null, so no base resolution
    //   ret.host = 'https:' -> psl.parse('https:') -> domain would be different
    const result = parse("https://example.com/page", "http://base.com/");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
    expect(result!.protocol).toBe("https:");
  });
});