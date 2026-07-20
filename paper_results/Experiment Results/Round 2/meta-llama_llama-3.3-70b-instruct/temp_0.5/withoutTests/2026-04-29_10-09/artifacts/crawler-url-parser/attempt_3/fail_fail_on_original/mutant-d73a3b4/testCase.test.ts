import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = "https://www.example.com/index.html";
    const pageurl = "https://www.example.com/";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});