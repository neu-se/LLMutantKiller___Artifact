import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse slashesDenoteHost second parse mutation', () => {
  it('should correctly parse URL with double-slash path after base URL resolution', () => {
    // Use a base URL without protocol (not starting with //) 
    // and a relative URL that starts with // (gets converted to http://)
    // The key: parsedBaseUrl has no protocol, parsedUrl has http: protocol
    // URL.resolve returns relative as-is (different protocols)
    // But parsedUrl.host is not null so we skip if-block
    // Try: base with no protocol, relative that is just a path
    // that when resolved against no-protocol base gives //host/path
    
    // Actually try: what if URL.resolve with no-protocol base and 
    // a relative URL that has slashes:true produces //host/path?
    const res = parse("path", "//www.example.com/base/");
    expect(res).not.toBeNull();
    expect(res!.host).toBe("www.example.com");
    expect(res!.url).toBe("http://www.example.com/base/path");
  });
});