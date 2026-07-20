import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Query parameter removal mutation test", () => {
  it("should remove utm parameters with underscores but not utm parameters with non-word characters", () => {
    const urlWithUnderscore = "http://example.com/path?utm_source=test&other=value";
    const result1 = parse(urlWithUnderscore);
    expect(result1?.url).toBe("http://example.com/path?other=value");

    const urlWithNonWordChar = "http://example.com/path?utm_source=test&utm_medium=email&ref=test";
    const result2 = parse(urlWithNonWordChar);
    expect(result2?.url).toContain("utm_source=test");
    expect(result2?.url).toContain("utm_medium=email");
  });
});