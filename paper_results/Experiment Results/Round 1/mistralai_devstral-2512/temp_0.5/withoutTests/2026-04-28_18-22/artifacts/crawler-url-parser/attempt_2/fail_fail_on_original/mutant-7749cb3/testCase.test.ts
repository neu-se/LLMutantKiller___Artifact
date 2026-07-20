import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when pageurl path ends with default.html", () => {
    const pageurl = "http://example.com/path/default.html";
    const linkurl = "http://example.com/path/sibling";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});