import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative url with base url containing query parameters', () => {
  it('should correctly resolve relative url against base url with query string', () => {
    // The base URL has query parameters
    // With true (original): query is parsed into object, then formatted back
    // With false (mutated): query remains as string
    // The key difference: URL.parse with parseQueryString=true parses query into object
    // URL.format then reconstructs it - behavior should be same for simple cases
    // But the slashesDenoteHost (3rd param) matters for protocol-relative base URLs
    // Since baseUrlStr gets // replaced with http://, let's use a base with explicit protocol
    // and check that relative resolution works correctly
    
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc?q1=val1&q2=val2");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc?q1=val1&q2=val2");
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});