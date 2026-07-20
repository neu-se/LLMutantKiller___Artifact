import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly classify link type when pageurl path ends with default.123", () => {
    const linkurl = "http://example.com/path/default.123";
    const pageurl = "http://example.com/path/";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});