import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle default.htm at end of path without trailing slash", () => {
    const linkurl = "http://example.com/path";
    const pageurl = "http://example.com/path/default.htm";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("uplevel");
  });
});