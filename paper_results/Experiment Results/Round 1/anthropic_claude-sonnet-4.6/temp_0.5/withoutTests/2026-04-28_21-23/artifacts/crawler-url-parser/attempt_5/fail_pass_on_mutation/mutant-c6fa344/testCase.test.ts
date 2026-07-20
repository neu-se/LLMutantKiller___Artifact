import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should not double-prepend http:// to protocol-relative URLs', () => {
    // If the mutation is present, a URL starting with // that somehow reaches
    // the prepend code would get http:// prepended, creating http:////
    const result1 = parse('//example.com');
    const result2 = parse('http://example.com');
    // Both should resolve to the same URL
    expect(result1?.url).toBe(result2?.url);
  });
});