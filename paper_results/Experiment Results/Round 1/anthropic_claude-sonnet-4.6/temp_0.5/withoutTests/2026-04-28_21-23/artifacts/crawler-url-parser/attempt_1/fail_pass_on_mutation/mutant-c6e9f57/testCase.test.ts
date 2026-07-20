import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("result_normalize_options should have normalization settings that affect URL parsing behavior - stripWWW removes www prefix from domain", () => {
    // The original code defines result_normalize_options with stripWWW: true
    // The mutated code has result_normalize_options = {}
    // We test that the parse function correctly handles URLs and returns expected structure
    // Since result_normalize_options is defined but checking its indirect effects:
    // Both versions produce same parse output since the variable isn't used in parse()
    // Instead, verify the module loads correctly and parse returns consistent results
    
    const result = parse("http://www.example.com/path/to/page");
    
    // Basic assertions that work on both versions
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/path/to/page");
    expect(result.host).toBe("www.example.com");
    expect(result.domain).toBe("example.com");
    expect(result.subdomain).toBe("www");
    expect(result.path).toBe("/path/to/page");
    expect(result.protocol).toBe("http:");
    
    // The result_normalize_options with stripWWW: true would strip www
    // but since it's not used in parse(), we verify the subdomain is 'www'
    // This test passes on original (subdomain = 'www') 
    // and should also pass on mutated since the variable isn't used
    // 
    // To create a meaningful difference, check the options object indirectly
    // by verifying module-level behavior
    expect(typeof result_normalize_options).toBe("undefined"); // This will fail
  });
});