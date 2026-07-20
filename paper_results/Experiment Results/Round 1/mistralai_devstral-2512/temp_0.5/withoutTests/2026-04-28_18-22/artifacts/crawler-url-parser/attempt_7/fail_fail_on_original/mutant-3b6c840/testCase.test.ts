import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL normalization", () => {
  it("should handle trailing slashes according to configuration", () => {
    // Test a URL that would be affected by removeTrailingSlash option
    const testUrl = "http://example.com/path/";
    const result = parse(testUrl);

    // This assertion would pass with removeTrailingSlash: true (original)
    // and fail with removeTrailingSlash: false (mutated)
    // if the option were actually being used
    expect(result?.url).toBe("http://example.com/path");
  });
});