import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("correctly handles a URL that would be affected by the protocol-relative regex", () => {
    // Test with a URL that goes through the no-baseUrl branch
    // and exercises the regex that differs between original and mutated
    const result = parse("example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});