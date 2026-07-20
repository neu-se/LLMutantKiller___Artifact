import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'sublevel' when pageurl.path is undefined and linkurl has one more path segment", () => {
    const linkurl = "https://example.com/path";
    const pageurl = "https://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});