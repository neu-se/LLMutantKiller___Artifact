import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function path comparison", () => {
  it("should correctly compare paths with index files", () => {
    const pageUrl = "http://example.com/path/";
    const linkUrl = "http://example.com/path/index.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});