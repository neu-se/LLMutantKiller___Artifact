import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'updomain' when link has fewer subdomains than page", () => {
    const linkUrl = "https://sub.example.com/path";
    const pageUrl = "https://sub.sub.example.com/path";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("updomain");
  });
});