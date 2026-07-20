import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser fragment handling", () => {
  it("should strip fragment from URL when parsing, resulting in null search and clean path", () => {
    // The stripFragment option controls whether fragments (#...) are removed from URLs
    // When stripFragment is true (original), fragments should be stripped
    // When stripFragment is false (mutated), fragments might be preserved
    
    // Test that a URL with a fragment is parsed correctly
    // The parse function manually strips fragments via regex, so we test
    // that the result_normalize_options stripFragment value is consistent
    // with the actual behavior by checking the parsed URL doesn't contain fragments
    
    const urlWithFragment = "http://www.example.com/page#section1";
    const result = parse(urlWithFragment);
    
    // The URL should be parsed successfully
    expect(result).not.toBeNull();
    
    // The resulting URL should not contain a fragment
    expect(result!.url).not.toContain("#section1");
    expect(result!.url).not.toContain("#");
    
    // The path should be clean
    expect(result!.path).toBe("/page");
    
    // Protocol should be preserved
    expect(result!.protocol).toBe("http:");
    
    // Host should be preserved  
    expect(result!.host).toBe("www.example.com");
    
    // Verify the URL is the clean version without fragment
    expect(result!.url).toBe("http://www.example.com/page");
  });
});