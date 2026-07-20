import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should treat default.html as directory when comparing paths", () => {
    const pageUrl = "http://example.com/path/";
    const linkUrl = "http://example.com/path/default.html";

    const result = gettype(linkUrl, pageUrl);

    expect(result).toBe("samelevel");
  });
});