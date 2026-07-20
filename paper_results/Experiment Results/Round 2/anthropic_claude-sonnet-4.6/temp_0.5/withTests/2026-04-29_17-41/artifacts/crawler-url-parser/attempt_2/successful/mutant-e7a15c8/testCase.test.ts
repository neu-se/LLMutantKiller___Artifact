import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype samelevel with trailing slash on pageurl', () => {
  it('should return samelevel when linkurl and pageurl are at same level and pageurl has trailing slash', () => {
    const result = gettype(
      "http://sub.domain.com/aaa/ccc",
      "http://sub.domain.com/aaa/bbb/"
    );
    expect(result).toBe("samelevel");
  });
});