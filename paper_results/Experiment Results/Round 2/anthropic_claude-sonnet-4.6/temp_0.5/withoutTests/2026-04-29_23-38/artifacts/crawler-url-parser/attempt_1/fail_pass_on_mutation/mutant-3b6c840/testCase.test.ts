import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function trailing slash behavior", () => {
  it("should handle URLs with trailing slashes consistently based on removeTrailingSlash option", () => {
    // Test with a URL that has a trailing slash
    const urlWithTrailingSlash = "http://www.example.com/path/";
    const result = parse(urlWithTrailingSlash);
    
    // In the original code, removeTrailingSlash: true means trailing slash should be removed
    // In the mutated code, removeTrailingSlash: false means trailing slash should be preserved
    // The URL.format from Node.js preserves the trailing slash, so if removeTrailingSlash
    // is applied, the result should NOT have a trailing slash
    
    // Since result_normalize_options doesn't appear to be actively used in the parse function,
    // let's test the actual URL output to detect any difference
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/path/");
    
    // Also test that the path is correctly set
    expect(result!.path).toBe("/path/");
    
    // Test basic URL parsing still works
    const simpleUrl = "http://example.com";
    const simpleResult = parse(simpleUrl);
    expect(simpleResult).not.toBeNull();
    expect(simpleResult!.host).toBe("example.com");
    expect(simpleResult!.domain).toBe("example.com");
  });
});