import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrl containing hash", () => {
  it("should correctly handle baseUrl with hash followed by content", () => {
    const currentUrl = "relative/path";
    const baseUrl = "http://example.com/base#section1";
    const result = parse(currentUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/relative/path");
    expect(result?.baseurl).toBe("http://example.com/base");
  });
});