import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should have removeTrailingSlash true making trailing-slash URLs normalize to non-trailing-slash", () => {
    // Test the exact boundary: root path trailing slash
    const result = parse("http://example.com/path/subpath/");
    expect(result).not.toBeNull();
    // With removeTrailingSlash: true -> "http://example.com/path/subpath"  
    // With removeTrailingSlash: false -> "http://example.com/path/subpath/"
    expect(result!.url).toBe("http://example.com/path/subpath");
  });
});