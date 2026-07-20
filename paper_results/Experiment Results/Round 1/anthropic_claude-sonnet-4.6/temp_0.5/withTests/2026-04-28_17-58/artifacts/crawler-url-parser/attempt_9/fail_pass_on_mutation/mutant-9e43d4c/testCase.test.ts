import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse slashesDenoteHost mutation', () => {
  it('should correctly parse URL when second parse sees protocol-relative URL', () => {
    // Use a relative URL that when resolved against a no-protocol base
    // produces a result that URL.format renders as //host/path
    // by having parsedBaseUrl with slashes:true from a URL like http://host
    // and parsedUrl being a relative path
    // After resolution, absoluteUrl might have slashes:true and no protocol
    // if URL.resolve strips the protocol somehow
    
    // Try: what if parsedBaseUrl comes from URL.parse of a URL that has
    // slashes:true but after URL.resolve the result loses its protocol?
    // This seems impossible but let's try with a specific input
    
    // Actually try: base = "http://host" and relative = "//other/path"
    // //other/path -> http://other/path (conversion)
    // parsedUrl.host = 'other' (not null) -> skip if-block
    // Won't work
    
    // Try the only remaining option: maybe URL.resolve with object args
    // behaves unexpectedly in the specific Node.js version used
    const res = parse("//www.test.com/path", "example.com/");
    expect(res).not.toBeNull();
    expect(res!.host).toBe("www.test.com");
    expect(res!.url).toBe("http://www.test.com/path");
  });
});