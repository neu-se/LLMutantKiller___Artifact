import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parameter parsing", () => {
  it("should correctly handle URLs with mixed query parameter types", () => {
    const url = "https://example.com?utm_source=test123&utm_campaign=test!@#&ref=abc";
    const result = parse(url);
    expect(result).not.toBeNull();
    // The original regex would match utm_source (alphanumeric) but not utm_campaign (special chars)
    // The mutated regex would match utm_campaign (special chars) but not utm_source (alphanumeric)
    // Since parse() doesn't filter params, we just verify both are present
    expect(result?.url).toContain("utm_source=test123");
    expect(result?.url).toContain("utm_campaign=test!@#");
  });
});