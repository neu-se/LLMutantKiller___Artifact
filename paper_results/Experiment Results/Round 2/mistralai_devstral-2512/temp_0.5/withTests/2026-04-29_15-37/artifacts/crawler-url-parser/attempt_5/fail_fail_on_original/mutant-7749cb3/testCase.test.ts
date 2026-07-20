import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly handle paths ending with default.html in middle of path", () => {
    const linkUrl = "http://example.com/aaa/default.html/ccc";
    const pageUrl = "http://example.com/aaa/default.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});