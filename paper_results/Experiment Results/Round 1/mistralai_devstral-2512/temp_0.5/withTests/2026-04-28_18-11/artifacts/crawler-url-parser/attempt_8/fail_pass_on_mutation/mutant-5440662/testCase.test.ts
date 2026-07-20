import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with undefined path', () => {
  it('should return "internal" when linkurl path is undefined and pageurl path is defined', () => {
    const linkurl = "http://example.com";
    const pageurl = "http://example.com/path/to/page";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});