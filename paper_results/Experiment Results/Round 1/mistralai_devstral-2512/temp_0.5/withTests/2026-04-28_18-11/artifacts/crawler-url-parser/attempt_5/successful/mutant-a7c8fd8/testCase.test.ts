import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation test", () => {
  it("should correctly handle default files with exactly two-character extensions", () => {
    const pageUrl = "http://example.com/path/to/page";
    const linkUrl = "http://example.com/path/to/default.ab";

    const result = gettype(linkUrl, pageUrl);

    expect(result).toBe("uplevel");
  });
});