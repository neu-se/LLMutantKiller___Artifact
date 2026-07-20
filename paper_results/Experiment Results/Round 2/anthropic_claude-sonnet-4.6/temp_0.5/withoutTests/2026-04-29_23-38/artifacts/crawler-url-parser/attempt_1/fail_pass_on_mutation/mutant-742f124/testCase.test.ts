import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser fragment handling", () => {
  it("should strip fragment from URL when parsing", () => {
    // The parse function manually strips fragments with replace(/#.*$/, '')
    // and delete parsedUrl.hash, so the result URL should never contain a fragment
    const result = parse("http://www.example.com/page#section1");
    
    // The URL returned should not contain the fragment
    expect(result).not.toBeNull();
    expect(result.url).not.toContain("#section1");
    expect(result.url).not.toContain("#");
    
    // The URL should be the base URL without fragment
    expect(result.url).toBe("http://www.example.com/page");
    expect(result.host).toBe("www.example.com");
    expect(result.path).toBe("/page");
  });
});