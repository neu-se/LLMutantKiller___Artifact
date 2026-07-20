import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html at start of path followed by subpath', () => {
  it('should return sublevel when link path starts with /index.html/ and page path is the subpath', () => {
    // Original: link_path stays "/index.html/subpage", page_path stays "/subpage"
    //   parts: link=["index.html","subpage"](2), page=["subpage"](1), diff=1
    //   "/index.html/subpage".includes("/subpage") = true -> "sublevel"
    // Mutated: link_path becomes "//subpage", page_path stays "/subpage"
    //   parts: link=["subpage"](1), page=["subpage"](1), diff=0
    //   without_last_part: link="/", page="" -> not equal -> "internal"
    const result = gettype(
      "http://example.com/index.html/subpage",
      "http://example.com/subpage"
    );
    expect(result).toBe("sublevel");
  });
});