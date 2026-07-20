import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Query parameter removal mutation test", () => {
  it("should handle URLs with utm parameters containing special characters", () => {
    const urlWithSpecialChar = "http://example.com/path?utm_source=test&utm_medium=email&ref=test";
    const result = parse(urlWithSpecialChar);
    expect(result?.url).toContain("utm_source=test");
    expect(result?.url).toContain("utm_medium=email");
    expect(result?.url).toContain("ref=test");
  });
});