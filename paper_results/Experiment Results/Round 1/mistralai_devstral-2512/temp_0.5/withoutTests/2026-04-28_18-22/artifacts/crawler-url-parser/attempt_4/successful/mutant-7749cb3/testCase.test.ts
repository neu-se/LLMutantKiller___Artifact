import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle default.html in middle of path", () => {
    const pageurl = "http://example.com/default.html/path";
    const linkurl = "http://example.com/default.html/path/sibling";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});