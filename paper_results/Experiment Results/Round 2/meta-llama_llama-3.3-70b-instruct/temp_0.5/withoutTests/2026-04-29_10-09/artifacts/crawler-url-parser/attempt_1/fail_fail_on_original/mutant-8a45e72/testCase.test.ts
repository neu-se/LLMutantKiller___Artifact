import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return correct type for link and page urls', () => {
    let linkurl = "http://sub.domain.com/aaa/bbb/ccc/index.html";
    let pageurl = "http://sub.domain.com/aaa/bbb/default.aspx";
    let result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});