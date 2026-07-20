import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should handle mixed case UTM parameters consistently", () => {
    const url1 = "https://example.com/path?utm_source=test&other=value";
    const url2 = "https://example.com/path?UTM_SOURCE=test&other=value";
    const result1 = parse(url1);
    const result2 = parse(url2);
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
    // These should behave the same way regardless of case if the regex is case-insensitive
    expect(result1.url.includes("utm_source")).toBe(result2.url.includes("UTM_SOURCE"));
  });
});