import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with non-word protocol-like prefix', () => {
  it('should prepend http:// and have http protocol for URL starting with ! before ://', () => {
    const res = parse("!://foo.com");
    expect(res).not.toBeNull();
    expect(res!.protocol).toBe('http:');
  });
});