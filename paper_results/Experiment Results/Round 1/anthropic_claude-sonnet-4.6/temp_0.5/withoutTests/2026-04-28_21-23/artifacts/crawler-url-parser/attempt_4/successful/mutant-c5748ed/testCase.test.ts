import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return uplevel when link is at /deep and page is at /index.html/deep", () => {
    // Original: pageurl_path "/index.html/deep" no $ match, stays, parts=["index.html","deep"]
    //   diff=-1, "/index.html/deep".includes("/deep") -> true -> "uplevel"
    // Mutated: pageurl_path "/index.html/deep" -> "//deep", parts=["deep"]
    //   diff=0, linkurl_without_last="" != pageurl_without_last="/" -> "internal"
    const result = gettype(
      "http://example.com/deep",
      "http://example.com/index.html/deep"
    );
    expect(result).toBe("uplevel");
  });
});