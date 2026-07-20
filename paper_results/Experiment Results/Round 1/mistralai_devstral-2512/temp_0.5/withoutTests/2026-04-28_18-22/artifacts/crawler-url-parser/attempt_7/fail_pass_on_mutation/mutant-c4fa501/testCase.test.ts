import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function with directory index handling", () => {
  it("should treat URLs with index.html as same directory level", () => {
    const pageUrl = "http://example.com/path/";
    const linkUrl = "http://example.com/path/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});