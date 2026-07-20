import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path without the last part', () => {
    const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
    const pageurl = "http://sub.domain.com/aaa/bbb/ddd";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });

  it('should not return "samelevel" when linkurl and pageurl do not have the same path without the last part', () => {
    const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
    const pageurl = "http://sub.domain.com/aaa/ddd/eee";
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe("samelevel");
  });
});