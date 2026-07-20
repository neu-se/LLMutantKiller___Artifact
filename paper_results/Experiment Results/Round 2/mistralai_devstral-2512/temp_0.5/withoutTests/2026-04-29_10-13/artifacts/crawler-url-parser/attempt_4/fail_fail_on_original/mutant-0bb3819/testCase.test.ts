import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'sublevel' for paths ending with default.html when mutation changes replacement", () => {
    const pageUrl = "http://example.com/path/";
    const linkUrl = "http://example.com/path/default.html/subpage";

    const result = gettype(linkUrl, pageUrl);

    expect(result).toBe("sublevel");
  });
});