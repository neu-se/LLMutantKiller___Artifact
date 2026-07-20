import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should not prepend http:// twice to a URL that already has a protocol", () => {
    // Test that a URL with http:// is not double-prepended
    const result = parse("http://example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.host).toBe("example.com");
  });
});