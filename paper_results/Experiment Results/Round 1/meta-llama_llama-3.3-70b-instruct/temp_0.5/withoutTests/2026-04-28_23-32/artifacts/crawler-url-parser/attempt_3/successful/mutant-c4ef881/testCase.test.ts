import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return "internal" when linkurl and pageurl have different paths without the last part', () => {
    const linkurl = "https://www.example.com/aaa/bbb/ccc";
    const pageurl = "https://www.example.com/aaa/ddd/eee";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});