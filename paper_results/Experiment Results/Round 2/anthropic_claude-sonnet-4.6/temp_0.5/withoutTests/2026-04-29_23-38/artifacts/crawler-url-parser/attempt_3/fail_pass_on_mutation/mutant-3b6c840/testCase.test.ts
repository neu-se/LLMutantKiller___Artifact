import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse url trailing slash handling", () => {
  it("should preserve trailing slash since removeTrailingSlash is not applied in parse", () => {
    // Based on actual behavior: the parse function uses Node's URL.parse/format
    // which preserves trailing slashes regardless of result_normalize_options
    // The original has removeTrailingSlash: true but it's not used in parse
    // Both original and mutant should behave the same here
    const result = parse("http://example.com/about/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/about/");
  });
});