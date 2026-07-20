import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'samelevel' when comparing paths where one ends with default.htm", () => {
    const linkUrl = "http://example.com/path/";
    const pageUrl = "http://example.com/path/default.htm";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});