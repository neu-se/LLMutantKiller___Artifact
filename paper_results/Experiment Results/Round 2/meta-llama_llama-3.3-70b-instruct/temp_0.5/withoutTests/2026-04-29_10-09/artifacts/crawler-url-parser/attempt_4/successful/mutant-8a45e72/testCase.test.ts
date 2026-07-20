import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return correct type for link and page urls', () => {
    let linkurl = "http://sub.domain.com/aaa/bbb/default.123/ccc";
    let pageurl = "http://sub.domain.com/aaa/bbb/default.123";
    let result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});