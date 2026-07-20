import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle default.html path normalization in samelevel detection", () => {
    const pageUrl = "http://example.com/path/default.html";
    const linkUrl = "http://example.com/path/file.txt";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});