import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'subdomain' when link has same subdomain count as page but different paths", () => {
    const linkUrl = "https://a.example.com/path1";
    const pageUrl = "https://b.example.com/path2";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("subdomain");
  });
});