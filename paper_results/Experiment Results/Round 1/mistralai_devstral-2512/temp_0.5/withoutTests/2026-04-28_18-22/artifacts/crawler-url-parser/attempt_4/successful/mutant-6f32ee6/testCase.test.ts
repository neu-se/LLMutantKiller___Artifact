import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'subdomain' when link URL has same number of subdomains as page URL", () => {
    const linkUrl = "https://a.b.example.com/path";
    const pageUrl = "https://c.d.example.com/other";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("subdomain");
  });
});