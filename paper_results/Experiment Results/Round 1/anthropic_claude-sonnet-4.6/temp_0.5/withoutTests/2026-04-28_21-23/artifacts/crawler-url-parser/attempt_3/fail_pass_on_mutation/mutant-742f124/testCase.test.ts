import { parse, extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should handle URL with fragment by treating fragment as non-existent for URL identity", () => {
    // Test parse with a URL containing a fragment
    // The manual regex stripping in parse() removes fragments regardless
    // But if normalize-url is used with these options somewhere in the pipeline,
    // the behavior would differ
    
    // Test that two calls with same URL but different fragments return identical url property
    const result1 = parse("http://example.com/path#frag1");
    const result2 = parse("http://example.com/path#frag2");
    const result3 = parse("http://example.com/path");
    
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
    expect(result3).not.toBeNull();
    
    expect(result1!.url).toBe(result3!.url);
    expect(result2!.url).toBe(result3!.url);
    expect(result1!.url).toBe(result2!.url);
  });
});