import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should remove UTM parameters case-insensitively", () => {
    const url = "https://example.com/path?UTM_SOURCE=test&other=value";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://example.com/path?other=value");
  });
});