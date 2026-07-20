import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol handling", () => {
  it("should correctly parse a URL with http:// protocol without double-prefixing", () => {
    // When no baseUrlStr is provided and the URL has http:// protocol,
    // the original code should NOT prepend http:// again
    // The mutation changes \w+ to \W+ which would cause http:// to be double-prefixed
    const result = parse("http://www.example.com/path");
    
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/path");
    expect(result!.protocol).toBe("http:");
    expect(result!.host).toBe("www.example.com");
  });
});