import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse with baseUrlStr containing fragment", () => {
  it("should strip entire fragment from baseUrlStr so relative URL resolves correctly", () => {
    // baseUrlStr = "http://example.com#ab"
    // Original /#.*$/ removes "#ab"  -> "http://example.com"
    // Mutated  /#.$/  removes "#a"   -> "http://example.comb"
    //
    // With currentUrl = "/page":
    // parsedUrl.host == null, so we resolve against parsedBaseUrl
    //
    // Original: URL.parse("http://example.com") -> host = "example.com"
    //           URL.resolve("http://example.com", "/page") -> "http://example.com/page"
    //
    // Mutated:  URL.parse("http://example.comb") -> host = "example.comb"  
    //           URL.resolve("http://example.comb", "/page") -> "http://example.comb/page"
    //           ret.host = "example.comb" != "example.com"

    const result = parse("/page", "http://example.com#ab");

    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
  });
});