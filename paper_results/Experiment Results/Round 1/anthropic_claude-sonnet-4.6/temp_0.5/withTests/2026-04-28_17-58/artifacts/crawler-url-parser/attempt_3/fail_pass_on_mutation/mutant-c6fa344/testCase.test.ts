import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation detection', () => {
  it('should correctly handle URL starting with // without baseUrl', () => {
    // After top-level // -> http:// replacement, "//google.com" becomes "http://google.com"
    // This should parse as a valid http URL
    const res = parse("//google.com");
    expect(res).not.toBeNull();
    expect(res.protocol).toBe("http:");
    expect(res.host).toBe("google.com");
    expect(res.url).toBe("http://google.com/");
  });
});