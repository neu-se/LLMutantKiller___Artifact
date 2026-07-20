import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html in middle of path', () => {
  it('should return sublevel when link path contains /index.html/ in the middle and page path is a direct child path', () => {
    // linkurl_path = "/index.html/subpage", pageurl_path = "/subpage"
    // Original: /\/index\.[a-z]+$/ does NOT match "/index.html/subpage" (not at end)
    //   so paths remain as-is: parts ["index.html","subpage"] vs ["subpage"] -> diff=1 -> sublevel
    // Mutated: /\/index\.[a-z]+/ DOES match "/index.html/subpage" (matches anywhere)
    //   so linkurl_path becomes "//subpage" -> parts ["subpage"] vs ["subpage"] -> diff=0 -> samelevel
    const result = gettype(
      "http://example.com/index.html/subpage",
      "http://example.com/subpage"
    );
    expect(result).toBe("sublevel");
  });
});