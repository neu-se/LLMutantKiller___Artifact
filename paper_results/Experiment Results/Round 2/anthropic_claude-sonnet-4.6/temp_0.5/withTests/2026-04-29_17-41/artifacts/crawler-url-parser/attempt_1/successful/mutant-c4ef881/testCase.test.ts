import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation detection', () => {
  it('should return "internal" when URLs have same path depth but different parent directories', () => {
    // Both URLs have 3 path parts (part_count_diff == 0)
    // but their parent paths differ: /aaa/bbb vs /xxx/yyy
    // Original: linkurl_without_last_part (/aaa/bbb) != pageurl_without_last_part (/xxx/yyy) => falls through to "internal"
    // Mutant: if (true) => always returns "samelevel"
    const result = gettype(
      "http://sub.domain.com/aaa/bbb/eee",
      "http://sub.domain.com/xxx/yyy/zzz"
    );
    expect(result).toBe("internal");
  });
});