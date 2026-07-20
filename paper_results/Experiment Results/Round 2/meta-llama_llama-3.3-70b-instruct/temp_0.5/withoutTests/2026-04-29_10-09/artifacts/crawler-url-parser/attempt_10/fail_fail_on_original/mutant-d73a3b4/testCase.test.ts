import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = "https://www.example.com/index.html";
    const pageurl = "https://www.example.com/index.html";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
    const linkurl2 = "https://www.example.com/index.html";
    const pageurl2 = "https://www.example.com/index";
    const result2 = gettype(linkurl2, pageurl2);
    expect(result2).not.toBe("samelevel");
  });
});