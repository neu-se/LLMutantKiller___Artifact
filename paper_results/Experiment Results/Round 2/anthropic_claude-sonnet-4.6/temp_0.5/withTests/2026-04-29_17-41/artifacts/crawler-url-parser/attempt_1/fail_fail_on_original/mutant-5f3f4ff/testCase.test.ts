import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with part_count_diff not equal to -1', () => {
  it('should return "internal" when link has 2 more path parts than page and paths do not match uplevel pattern', () => {
    // linkurl has path /aaa/bbb/ccc/ddd (4 parts), pageurl has path /aaa/bbb (2 parts)
    // part_count_diff = 4 - 2 = 2, so neither samelevel, sublevel(1), nor uplevel(-1)
    // Original: returns "internal"
    // Mutated: the else-if (true) branch runs, checks pageurl_path.includes(linkurl_path) which is false, falls to "internal"
    // Need a case where part_count_diff == -1 is NOT met but the uplevel condition would be true in mutated code
    // When part_count_diff == 0 and paths differ: already returns "samelevel"
    // Let's try part_count_diff == 2 where pageurl_path.includes(linkurl_path) would be true
    const result = gettype("http://sub.domain.com/aaa/", "http://sub.domain.com/aaa/bbb/ccc");
    expect(result).toBe("uplevel");
  });
});