import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return 'samelevel' when the link URL and page URL have the same host and the same path", () => {
    const linkUrl = "http://www.example.com/aaa/bbb";
    const pageUrl = "http://www.example.com/aaa/bbb";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});