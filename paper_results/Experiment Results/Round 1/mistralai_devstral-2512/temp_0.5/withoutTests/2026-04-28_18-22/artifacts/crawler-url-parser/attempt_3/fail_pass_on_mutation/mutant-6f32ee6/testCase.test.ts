import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'updomain' when link URL has fewer subdomains than page URL", () => {
    const linkUrl = "https://example.com/path";
    const pageUrl = "https://sub.example.com/other";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("updomain");
  });
});