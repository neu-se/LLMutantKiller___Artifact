import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when link and page have the same path', () => {
    const linkurl = "http://example.com/path/to/resource";
    const pageurl = "http://example.com/path/to/resource";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
  });
});