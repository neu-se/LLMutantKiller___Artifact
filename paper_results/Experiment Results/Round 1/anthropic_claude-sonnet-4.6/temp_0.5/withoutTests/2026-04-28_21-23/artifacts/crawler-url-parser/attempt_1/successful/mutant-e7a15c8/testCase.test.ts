import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with trailing slash paths", () => {
  it("should return 'samelevel' when two URLs are at the same directory level with trailing slashes", () => {
    // Both URLs have trailing slashes and are at the same level
    // linkurl: http://example.com/aaa/ccc/
    // pageurl: http://example.com/aaa/bbb/
    // They should be "samelevel" since they share the same parent /aaa/
    const result = gettype("http://example.com/aaa/ccc/", "http://example.com/aaa/bbb/");
    expect(result).toBe("samelevel");
  });
});