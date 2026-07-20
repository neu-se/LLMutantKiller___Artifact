import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify samelevel links with trailing slash in pageurl", () => {
    const linkUrl = "http://example.com/path/to/page";
    const pageUrl = "http://example.com/path/to/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});