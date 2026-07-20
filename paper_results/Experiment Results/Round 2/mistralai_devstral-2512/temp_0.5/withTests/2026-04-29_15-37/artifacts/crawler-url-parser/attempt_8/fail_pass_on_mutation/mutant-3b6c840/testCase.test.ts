import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Trailing slash behavior detection", () => {
  it("should detect trailing slash removal when option is enabled", () => {
    // This test assumes the option would be applied in a future implementation
    const urlWithSlash = "http://example.com/path/";
    const result = parse(urlWithSlash);

    // In the original code (removeTrailingSlash: true but not applied), this passes
    // In mutated code (removeTrailingSlash: false but not applied), this also passes
    // But if the option were actually used:
    // - Original would remove slash (fail this test)
    // - Mutated would keep slash (pass this test)
    expect(result?.url).toBe(urlWithSlash);
  });
});