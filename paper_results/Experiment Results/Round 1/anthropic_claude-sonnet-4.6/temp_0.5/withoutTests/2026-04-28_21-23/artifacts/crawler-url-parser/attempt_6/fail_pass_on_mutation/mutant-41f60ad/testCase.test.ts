import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse localhost URL with query parameters", () => {
    // Use a URL that goes through the relative path (parsedUrl.host == null && baseUrlStr)
    // After resolution, the new currentUrlStr has no query string
    // Then URL.parse(currentUrlStr, true, true) vs URL.parse(currentUrlStr, false, true)
    // For a URL without query: query={} vs query=null
    // URL.format with query={} produces trailing ? in some Node versions
    const result = parse("page", "http://example.com/dir/");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/dir/page");
    expect(result.search).toBeNull();
    expect(result.querycount).toBe(0);
  });
});