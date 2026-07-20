import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly identify host when relative URL is resolved against base with query params", () => {
    // Try a case where currentUrlStr after resolution might be protocol-relative
    // URL.resolve can sometimes produce protocol-relative URLs
    // e.g., URL.resolve("http://example.com/", "//other.com/path") = "http://other.com/path"
    // But what about URL.resolve with a parsedUrl that has no protocol?
    
    // parsedUrl = URL.parse("//other.com/path", true, true) 
    //   -> with slashesDenoteHost=true: {host: "other.com", pathname: "/path"}
    // URL.resolve(parsedBaseUrl, parsedUrl) where parsedUrl has host but no protocol
    // This might produce "//other.com/path" which when formatted gives "//other.com/path"
    // Then second URL.parse("//other.com/path", true, true) -> host="other.com" ✓
    // But second URL.parse("//other.com/path", true, false) -> host=null ✗
    
    // BUT: "//other.com/path" at the start gets replaced to "http://other.com/path"
    // So currentUrlStr going into first parse is "http://other.com/path"
    // parsedUrl.host = "other.com" (not null), so we DON'T enter the resolution branch
    // currentUrlStr stays as "http://other.com/path"
    // Second parse: same regardless of slashesDenoteHost
    
    // I need a case where parsedUrl.host IS null but after resolution, currentUrlStr
    // becomes something that starts with // (without http:)
    
    // What if parsedUrl is a relative path (host=null) AND baseUrlStr is provided
    // AND URL.resolve produces a protocol-relative URL?
    // URL.resolve("http://example.com/", "..//other.com/path") 
    //   = "http://example.com//other.com/path" (not protocol-relative)
    
    // Hmm, what about URL.format of a URL object that has no protocol?
    // URL.parse("relative/path", true, true) = {protocol: null, host: null, pathname: "relative/path"}
    // URL.resolve({protocol:"http:", host:"example.com"}, {pathname: "relative/path"})
    //   This might not work as expected since URL.resolve expects strings...
    
    // Actually URL.resolve(parsedBaseUrl, parsedUrl) - parsedBaseUrl and parsedUrl are objects
    // URL.resolve coerces them to strings via URL.format
    // URL.format({protocol:"http:", host:"example.com", pathname:"/"}) = "http://example.com/"
    // URL.format({pathname: "relative/path"}) = "relative/path"
    // URL.resolve("http://example.com/", "relative/path") = "http://example.com/relative/path"
    
    const result = parse("relative/path", "http://example.com/base/");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
  });
});