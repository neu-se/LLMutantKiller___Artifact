import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' when link has one more path segment than page and page path does not include link path", () => {
    // part_count_diff == -1: link has one fewer path part than page
    // In original: else if (part_count_diff == -1) checks pageurl_path.includes(linkurl_path)
    // In mutated: else if (true) always runs this check after part_count_diff == 1 block
    // When part_count_diff == -1 and pageurl_path does NOT include linkurl_path, should return "internal"
    // But when part_count_diff == 1 (mutated: true), and somehow condition is met...
    
    // Test case: part_count_diff == -1, pageurl_path does NOT include linkurl_path
    // link: /aaa/bbb/, page: /aaa/ccc/ -> part_count_diff = 2-2 = 0, samelevel
    
    // Let's test part_count_diff == -1 where pageurl does NOT include linkurl
    // link: /aaa/, page: /bbb/ccc/ -> part_count_diff = 1-2 = -1
    // pageurl_path = /bbb/ccc/, linkurl_path = /aaa/
    // /bbb/ccc/.includes(/aaa/) = false -> should return "internal"
    const result = gettype("http://example.com/aaa/", "http://example.com/bbb/ccc/");
    expect(result).toBe("internal");
  });
});