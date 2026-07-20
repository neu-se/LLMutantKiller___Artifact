import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should normalize default.html to empty string in path comparison", () => {
    const pageUrl = "http://example.com/path/default.html";
    const linkUrl = "http://example.com/path/";

    const result = gettype(linkUrl, pageUrl);

    expect(result).toBe("uplevel");
  });
});