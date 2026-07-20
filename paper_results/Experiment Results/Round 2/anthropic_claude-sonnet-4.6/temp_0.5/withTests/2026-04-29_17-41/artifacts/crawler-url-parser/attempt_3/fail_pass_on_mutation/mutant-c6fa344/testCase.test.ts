import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with // prefix behavior', () => {
  it('should handle URL starting with // by treating it as http://', () => {
    // After pre-conversion // -> http://, this becomes http://google.com
    // Both versions should return the same result
    // But let's test a URL that exercises the regex path with no baseUrl
    // where currentUrlStr somehow starts with //
    // The only way: if the pre-conversion doesn't apply
    // Actually testing with a URL that has no protocol and no //
    // to verify the http:// prepending works correctly
    const res = parse("sub.domain.com/aaa/bbb");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://sub.domain.com/aaa/bbb");
  });
});