import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation detection - final attempt', () => {
  it('should correctly handle a URL with no protocol and no base URL', () => {
    // Testing "sub.domain.com/aaa/bbb" - exercises the else block with the regex
    // Both versions should prepend http://
    const res = parse("sub.domain.com/aaa/bbb");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://sub.domain.com/aaa/bbb");
    expect(res!.querycount).toBe(0);
  });
});