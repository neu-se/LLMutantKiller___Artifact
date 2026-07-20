import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly normalize paths ending with index.html when comparing", () => {
    const linkUrl = "http://example.com/path/index.html";
    const pageUrl = "http://example.com/path/other";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("uplevel");
  });
});