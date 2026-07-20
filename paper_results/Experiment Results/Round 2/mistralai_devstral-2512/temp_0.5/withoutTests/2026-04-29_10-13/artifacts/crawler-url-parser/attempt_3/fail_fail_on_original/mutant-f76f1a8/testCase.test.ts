import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when pageurl path ends with 'default.ab'", () => {
    const pageUrl = "http://example.com/path/default.ab";
    const linkUrl = "http://example.com/path/default.ab/sublink";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});