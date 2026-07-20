import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return "internal" when linkurl and pageurl are on the same domain but not samelevel', () => {
    const linkurl = "https://www.example.com/aaa/bbb";
    const pageurl = "https://www.example.com/aaa/ccc";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});