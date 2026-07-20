import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return 'sublevel' when the link URL and page URL have the same host and the link URL path has one more part than the page URL path, but not 'samelevel'", () => {
    const linkUrl = "http://www.example.com/aaa/bbb/ccc";
    const pageUrl = "http://www.example.com/aaa/bbb";
    const result = gettype(linkUrl, pageUrl);
    expect(result).not.toBe("samelevel");
    const linkUrl2 = "http://www.example.com/aaa/bbb";
    const pageUrl2 = "http://www.example.com/aaa/bbb";
    const result2 = gettype(linkUrl2, pageUrl2);
    expect(result2).toBe("samelevel");
  });
});