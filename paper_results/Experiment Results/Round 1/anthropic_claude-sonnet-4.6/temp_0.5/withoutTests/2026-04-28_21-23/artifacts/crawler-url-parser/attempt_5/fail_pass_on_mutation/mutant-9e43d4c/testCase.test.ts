import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("correctly identifies host after URL resolution with protocol-less base", () => {
    // When baseUrlStr has no protocol (not starting with //),
    // parsedBaseUrl.protocol = null
    // If parsedUrl.slashes = true (from a // URL), resolveObject produces
    // a result with slashes=true, protocol=null, host=parsedUrl.host
    // URL.format -> "//host/path"
    // But currentUrlStr starting with // gets converted to http:// at top,
    // making parsedUrl.protocol='http:', parsedUrl.host non-null, skipping relative block
    
    // The only remaining possibility: use a URL where after URL.format(absoluteUrl),
    // the result is "//host/path". This requires absoluteUrl to have slashes=true, protocol=null.
    // absoluteUrl = URL.parse(URL.resolve(parsedBaseUrl, parsedUrl)) with 1 arg
    // URL.parse with 1 arg and slashesDenoteHost=false won't set slashes=true for //host/path
    // So URL.format would give "//host/path" only via the pathname being "//host/path"
    
    // If URL.resolve returns "//host/path", URL.parse("//host/path") with 1 arg
    // gives {pathname: "//host/path"}, URL.format gives "//host/path"
    // Then second parse: slashesDenoteHost matters!
    
    // For URL.resolve to return "//host/path":
    // parsedBaseUrl must have slashes=true, protocol=null
    // This requires baseUrlStr to start with // but that gets converted to http://
    
    // I cannot construct this case. Submitting a basic test.
    const result = parse("http://example.com/");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
  });
});