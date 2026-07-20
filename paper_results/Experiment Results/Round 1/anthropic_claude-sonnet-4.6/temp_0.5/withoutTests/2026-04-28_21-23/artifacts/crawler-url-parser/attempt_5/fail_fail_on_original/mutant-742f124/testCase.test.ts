import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should preserve query parameters that are not utm_ when parsing URLs", () => {
    // Test that removeQueryParameters option works - if normalize-url is used with
    // result_normalize_options, utm_ params should be stripped
    const result = parse("http://example.com/page?utm_source=test&q=hello");
    
    expect(result).not.toBeNull();
    // If normalize-url is being used with result_normalize_options,
    // utm_source should be removed but q should remain
    expect(result!.url).toContain("q=hello");
    expect(result!.url).not.toContain("utm_source");
  });
});