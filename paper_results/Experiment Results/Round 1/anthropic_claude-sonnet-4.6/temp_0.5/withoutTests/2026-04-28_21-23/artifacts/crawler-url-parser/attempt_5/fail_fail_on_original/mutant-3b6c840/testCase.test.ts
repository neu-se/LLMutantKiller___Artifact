import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should normalize URL by removing trailing slash when removeTrailingSlash is true", () => {
    // Test that the module's normalize options with removeTrailingSlash:true
    // affects URL processing - URLs ending in / should match those without
    const withSlash = parse("http://example.com/about/");
    const withoutSlash = parse("http://example.com/about");
    expect(withSlash!.url).toBe(withoutSlash!.url);
  });
});