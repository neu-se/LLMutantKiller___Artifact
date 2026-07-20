import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return 'internal' when the link URL and page URL have the same host and the link URL path has one more part than the page URL path", () => {
    const linkUrl = "http://www.example.com/aaa/bbb/ccc";
    const pageUrl = "http://www.example.com/aaa/bbb";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});