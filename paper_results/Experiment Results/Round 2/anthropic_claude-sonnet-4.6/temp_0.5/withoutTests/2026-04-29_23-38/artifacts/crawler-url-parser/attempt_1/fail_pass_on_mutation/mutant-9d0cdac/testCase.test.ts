import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with absolute URLs containing multi-character protocols", () => {
  it("should correctly handle an absolute URL with multi-character protocol when a baseUrl is provided", () => {
    // With the original code, 'https://other.com/page' has '\w+:' pattern (https:)
    // so the condition is false and http:// is NOT prepended
    // With the mutated code, 'https' doesn't match '\w:' (single char + colon)
    // so http:// gets prepended, making the URL malformed
    const result = parse("https://other.com/page", "http://base.com/");
    
    // The result should preserve the https:// protocol, not become http://https://other.com/page
    expect(result).not.toBeNull();
    expect(result!.url).toBe("https://other.com/page");
    expect(result!.protocol).toBe("https:");
    expect(result!.host).toBe("other.com");
  });
});