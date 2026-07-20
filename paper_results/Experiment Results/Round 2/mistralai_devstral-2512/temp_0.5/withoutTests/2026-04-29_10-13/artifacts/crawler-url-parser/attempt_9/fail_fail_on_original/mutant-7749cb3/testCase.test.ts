import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle default.htm followed by additional path segments", () => {
    const linkurl = "http://example.com/path/default.htm/extra";
    const pageurl = "http://example.com/path/default.htm";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});