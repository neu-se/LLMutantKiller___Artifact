import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should normalize default.html to directory path when comparing", () => {
    const pageUrl = "http://example.com/path/";
    const linkUrl = "http://example.com/path/default.html";

    const result = gettype(linkUrl, pageUrl);

    expect(result).toBe("samelevel");
  });
});