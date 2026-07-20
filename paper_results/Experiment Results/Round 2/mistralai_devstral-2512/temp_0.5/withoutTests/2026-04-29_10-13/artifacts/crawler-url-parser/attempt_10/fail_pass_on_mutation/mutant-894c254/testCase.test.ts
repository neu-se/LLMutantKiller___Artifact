import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle UTM parameters with different casing", () => {
    const url = "https://example.com/path?utm_source=test&UTM_MEDIUM=email&other=value";
    const result = parse(url);
    expect(result).not.toBeNull();
    // Since the normalization options aren't applied, all parameters should be preserved
    expect(result.url).toContain("utm_source=test");
    expect(result.url).toContain("UTM_MEDIUM=email");
    expect(result.url).toContain("other=value");
  });
});