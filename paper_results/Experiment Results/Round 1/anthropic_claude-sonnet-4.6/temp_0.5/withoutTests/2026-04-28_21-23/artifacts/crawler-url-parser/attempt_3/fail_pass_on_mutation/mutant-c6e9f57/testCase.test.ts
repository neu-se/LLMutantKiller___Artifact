import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser gettype", () => {
  it("should classify URL with trailing slash same as URL without when removeTrailingSlash is true", () => {
    const result = gettype("http://example.com/page/", "http://example.com/page");
    expect(result).toBe("samelevel");
  });
});