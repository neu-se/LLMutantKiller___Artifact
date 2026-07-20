import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse URL with multi-character protocol without base URL", () => {
    // Test with a URL that would expose the \w+ vs \w difference
    // If somehow http:// URL enters the block:
    // - original: doesn't prepend (http: matches \w+:)  
    // - mutated: prepends (http: doesn't match \w:)
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/");
    expect(result?.host).toBe("example.com");
  });
});