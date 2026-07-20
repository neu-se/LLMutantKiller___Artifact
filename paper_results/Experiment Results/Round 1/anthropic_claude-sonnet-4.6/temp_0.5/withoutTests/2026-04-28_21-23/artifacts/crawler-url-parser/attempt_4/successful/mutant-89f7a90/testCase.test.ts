import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function baseUrl fragment handling", () => {
  it("should correctly set baseurl field when baseUrl contains a fragment", () => {
    // Use a relative path so parsedUrl.host == null, triggering the baseUrl resolution path
    // The baseurl field is set to URL.format(parsedBaseUrl) where parsedBaseUrl = URL.parse(baseUrlStr)
    // Original: baseUrlStr = "http://example.com/page" -> baseurl = "http://example.com/page"
    // Mutated: baseUrlStr = "http://example.com/pageStryker was here!" -> URL.parse fails or gives wrong result
    const result = parse("subpage", "http://example.com/page#frag");
    expect(result).not.toBeNull();
    // The baseurl should reflect the clean base URL without fragment or mutation string
    expect(result!.baseurl).toBe("http://example.com/page");
  });
});