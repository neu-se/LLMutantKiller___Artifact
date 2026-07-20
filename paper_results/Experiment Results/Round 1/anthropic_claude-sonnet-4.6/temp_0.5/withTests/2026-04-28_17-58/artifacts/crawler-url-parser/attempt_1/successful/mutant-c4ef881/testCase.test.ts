import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with same path depth but different parent directories', () => {
  it('should return "internal" when two URLs have same number of path parts but different parent directories', () => {
    // Both URLs have 2 path parts (same depth), but different parent directories
    // linkurl_without_last_part = "/aaa" (from /aaa/bbb)
    // pageurl_without_last_part = "/ccc" (from /ccc/ddd)
    // These are NOT equal, so result should be "internal", not "samelevel"
    const result = gettype(
      "http://example.com/aaa/bbb",
      "http://example.com/ccc/ddd"
    );
    expect(result).toBe("internal");
  });
});