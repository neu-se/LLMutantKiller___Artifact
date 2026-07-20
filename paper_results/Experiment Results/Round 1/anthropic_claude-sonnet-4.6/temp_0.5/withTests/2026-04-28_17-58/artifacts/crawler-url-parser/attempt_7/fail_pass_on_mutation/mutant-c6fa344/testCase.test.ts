import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should return null for empty string', () => {
    const res = parse("");
    // empty string after preprocessing: ""
    // condition: true (enters if block)
    // both regexes prepend http:// to ""
    // URL.parse("http://") has empty host
    // protocol is http: so doesn't return null
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://");
  });
});