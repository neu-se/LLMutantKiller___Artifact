import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with undefined path', () => {
  it('should return "internal" when both urls have undefined paths', () => {
    const linkurl = "http://example.com";
    const pageurl = "http://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});