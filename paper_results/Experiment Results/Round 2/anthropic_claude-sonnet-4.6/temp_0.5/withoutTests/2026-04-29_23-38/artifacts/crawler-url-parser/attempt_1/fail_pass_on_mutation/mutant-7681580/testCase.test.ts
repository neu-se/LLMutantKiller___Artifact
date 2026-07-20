import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly parse a URL that already contains http:// protocol", () => {
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});