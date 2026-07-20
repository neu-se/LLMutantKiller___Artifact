import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' for default.html paths when mutation changes replacement", () => {
    const pageUrl = "http://example.com/path/";
    const linkUrl = "http://example.com/path/default.html";

    const result = gettype(linkUrl, pageUrl);

    expect(result).toBe("internal");
  });
});