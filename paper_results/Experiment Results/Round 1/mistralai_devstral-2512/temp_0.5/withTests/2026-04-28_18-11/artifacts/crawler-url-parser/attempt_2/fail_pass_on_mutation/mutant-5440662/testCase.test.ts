import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with undefined path', () => {
  it('should return "sublevel" when pageurl has undefined path', () => {
    const linkurl = "http://example.com/path";
    const pageurl = "http://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});