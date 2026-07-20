import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'external' for URLs with different domains", () => {
    const linkUrl = "https://example.com/path";
    const pageUrl = "https://other.com/path";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("external");
  });
});