import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should preserve all query parameters as the normalization options are not applied", () => {
    const url = "https://example.com/path?utm_source=test&UTM_MEDIUM=email&ref=abc&other=value";
    const result = parse(url);
    expect(result).not.toBeNull();
    // Since the normalization options aren't applied, all parameters should be preserved
    expect(result.url).toContain("utm_source=test");
    expect(result.url).toContain("UTM_MEDIUM=email");
    expect(result.url).toContain("ref=abc");
    expect(result.url).toContain("other=value");
  });
});