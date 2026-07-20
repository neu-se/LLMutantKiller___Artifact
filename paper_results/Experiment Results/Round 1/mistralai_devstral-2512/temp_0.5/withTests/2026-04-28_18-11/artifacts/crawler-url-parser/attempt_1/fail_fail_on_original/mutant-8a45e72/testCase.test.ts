import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default file extension', () => {
  it('should correctly identify samelevel when pageurl ends with default.htm', () => {
    const linkurl = "http://example.com/aaa/bbb/ccc";
    const pageurl = "http://example.com/aaa/bbb/default.htm";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});