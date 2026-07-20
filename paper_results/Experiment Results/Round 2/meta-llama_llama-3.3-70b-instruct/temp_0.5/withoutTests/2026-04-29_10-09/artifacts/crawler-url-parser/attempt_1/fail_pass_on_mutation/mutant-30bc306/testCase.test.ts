import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return the correct type for a given link and page url', () => {
    let linkurl = "http://www.example.com/aaa/bbb/index.html";
    let pageurl = "http://www.example.com/aaa/bbb/";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");

    linkurl = "http://www.example.com/aaa/bbb/index.htm";
    pageurl = "http://www.example.com/aaa/bbb/";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
  });
});