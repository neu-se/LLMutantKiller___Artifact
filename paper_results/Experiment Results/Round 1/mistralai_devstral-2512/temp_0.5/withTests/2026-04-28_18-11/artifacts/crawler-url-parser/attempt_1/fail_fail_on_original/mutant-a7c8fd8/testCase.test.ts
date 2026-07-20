import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly identify path normalization for default files with multi-character extensions", () => {
    const pageUrl = "http://example.com/path/to/page";
    const linkUrl = "http://example.com/path/to/default.abcd";

    const result = gettype(linkUrl, pageUrl);

    expect(result).toBe("samelevel");
  });
});