import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return internal for link with /index.html in middle of path compared to sibling page", () => {
    // Original: linkurl_path "/section/index.html/deep" stays (no $ match), parts=3
    //           pageurl_path "/section/page" stays, parts=2
    //           diff=1, includes check fails -> "internal"
    // Mutated:  linkurl_path "/section/index.html/deep" -> "/section//deep", parts=["section","deep"]=2
    //           diff=0, both without last = "/section" -> "samelevel"
    const result = gettype(
      "http://example.com/section/index.html/deep",
      "http://example.com/section/page"
    );
    expect(result).toBe("internal");
  });
});