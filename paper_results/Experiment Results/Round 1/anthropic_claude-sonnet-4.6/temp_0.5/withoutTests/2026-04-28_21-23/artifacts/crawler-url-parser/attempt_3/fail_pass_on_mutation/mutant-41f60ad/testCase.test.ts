import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should parse URL with query parameters correctly preserving search string via URL.format", () => {
    // A URL where parseQueryString matters for URL.format output
    // When parseQueryString=true: query={a:'1'}, search='?a=1' -> format uses search
    // When parseQueryString=false: query='a=1', search='?a=1' -> same
    // The difference shows when URL has been through resolve and currentUrlStr changes
    const result = parse("../other?key=value", "http://example.com/dir/page");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/other?key=value");
    expect(result.querycount).toBe(1);
  });
});