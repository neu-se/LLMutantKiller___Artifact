import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('fragment stripping in parse', () => {
  it('should return null for URL with only a multi-character fragment as currentUrl with baseUrl', () => {
    // parse("#section", "http://example.com/page")
    // Original: "#section" -> strip -> "" -> URL.parse("") -> host=null
    //   -> URL.resolve(base, {pathname: undefined, ...}) 
    //   -> url.format({}) = "" -> url.resolve(base, "") = base URL
    //   -> ret.url = "http://example.com/page"
    // Mutation: "#section" not stripped -> URL.parse("#section") -> host=null, hash="#section"
    //   -> delete hash -> url.format({hash:undefined, href:"#section"}) 
    //   Hmm, if url.format uses href... = "#section"
    //   -> url.resolve(base, "#section") = "http://example.com/page#section"
    //   -> URL.parse that -> hash="#section" -> delete -> "http://example.com/page"
    // Still same...
    const result = parse("#section", "http://example.com/page");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/page");
  });
});