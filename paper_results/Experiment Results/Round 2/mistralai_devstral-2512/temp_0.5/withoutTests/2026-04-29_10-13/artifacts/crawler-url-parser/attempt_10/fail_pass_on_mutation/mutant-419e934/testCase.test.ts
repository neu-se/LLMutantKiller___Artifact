import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle paths ending with index.html when comparing with sibling directory", () => {
    const pageUrl = "http://example.com/path/index.html";
    const linkUrl = "http://example.com/path/sibling/";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});