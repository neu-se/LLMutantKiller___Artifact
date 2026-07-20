import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype samelevel detection with trailing slash', () => {
  it('should return samelevel when link url has trailing slash and same parent directory', () => {
    // linkurl: http://sub.domain.com/aaa/bbb/
    // pageurl: http://sub.domain.com/aaa/ccc
    // Both have parent /aaa, so should be samelevel
    // Original regex: linkurl_path=/aaa/bbb/ -> replace (\/[^\/]*)[\/]?$ -> /aaa
    // Mutated regex: linkurl_path=/aaa/bbb/ -> replace (\/[^\/]*)[^\/]?$ -> /aaa/ (trailing slash remains)
    // /aaa/ != /aaa -> samelevel check fails in mutant, returns "internal" instead
    const result = gettype("//sub.domain.com/aaa/bbb/", "//sub.domain.com/aaa/ccc");
    expect(result).toBe("samelevel");
  });
});