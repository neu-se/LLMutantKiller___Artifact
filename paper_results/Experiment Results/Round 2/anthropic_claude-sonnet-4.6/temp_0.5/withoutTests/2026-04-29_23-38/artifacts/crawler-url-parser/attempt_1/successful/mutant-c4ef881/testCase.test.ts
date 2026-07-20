import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype", () => {
  it("should return 'internal' when same host and same path depth but different parent directories", () => {
    // Both URLs have same host and same number of path parts (part_count_diff == 0)
    // but different parent paths, so they should NOT be "samelevel"
    const linkurl = "http://example.com/ccc/ddd";
    const pageurl = "http://example.com/aaa/bbb";
    
    const result = gettype(linkurl, pageurl);
    
    // Original: linkurl_without_last_part ("/ccc") != pageurl_without_last_part ("/aaa")
    // so it should NOT return "samelevel", it should return "internal"
    // Mutated: always returns "samelevel" when part_count_diff == 0
    expect(result).toBe("internal");
  });
});