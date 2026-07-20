import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype samelevel with trailing slash', () => {
  it('should return samelevel when link path has trailing slash and is at same level as page path', () => {
    // linkurl_path = "/aaa/bbb/" after normalization
    // pageurl_path = "/aaa/ccc" after normalization
    // linkurl_without_last_part should be "/aaa" (stripping "/bbb/")
    // pageurl_without_last_part should be "/aaa" (stripping "/ccc")
    // So they should be equal => "samelevel"
    const result = gettype(
      "http://sub.domain.com/aaa/bbb/",
      "http://sub.domain.com/aaa/ccc"
    );
    expect(result).toBe("samelevel");
  });
});