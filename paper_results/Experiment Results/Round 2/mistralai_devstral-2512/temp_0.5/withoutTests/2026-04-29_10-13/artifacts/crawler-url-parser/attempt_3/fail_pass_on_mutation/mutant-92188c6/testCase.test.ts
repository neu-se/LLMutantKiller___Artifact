import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment handling", () => {
  it("should correctly handle URLs with fragments when base URL is provided", () => {
    const baseUrl = "http://example.com/base#fragment";
    const currentUrl = "relative/path";
    const result = parse(currentUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.baseurl).toBe("http://example.com/base");
    expect(result?.url).toBe("http://example.com/relative/path");
  });
});