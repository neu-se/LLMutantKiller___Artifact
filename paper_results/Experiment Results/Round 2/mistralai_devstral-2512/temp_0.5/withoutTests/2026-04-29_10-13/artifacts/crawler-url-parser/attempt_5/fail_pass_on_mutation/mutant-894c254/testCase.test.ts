import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle UTM parameters case-sensitively", () => {
    const url = "https://example.com/path?UTM_SOURCE=test&other=value";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toContain("UTM_SOURCE=test");
    expect(result.url).toContain("other=value");
  });
});