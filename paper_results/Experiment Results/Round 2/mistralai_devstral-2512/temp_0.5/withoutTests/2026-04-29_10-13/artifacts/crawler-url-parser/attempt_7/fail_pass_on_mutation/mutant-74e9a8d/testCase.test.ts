import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly normalize default.htm in pageUrl path for samelevel comparison", () => {
    const linkUrl = "http://example.com/path/";
    const pageUrl = "http://example.com/path/default.htm";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});