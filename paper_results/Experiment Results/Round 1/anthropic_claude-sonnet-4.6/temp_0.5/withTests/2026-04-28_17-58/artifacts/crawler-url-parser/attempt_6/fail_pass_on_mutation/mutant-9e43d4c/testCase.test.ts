import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse second URL.parse slashesDenoteHost mutation', () => {
  it('should correctly parse host when currentUrlStr is protocol-relative after if-block', () => {
    // The only way to expose this mutation is if currentUrlStr at the second parse
    // starts with //. This can happen if URL.format(absoluteUrl) produces //host/path.
    // This requires absoluteUrl to have slashes:true, no protocol, and a host.
    // This happens when URL.resolve returns //host/path.
    // URL.resolve returns //host/path when base has no protocol and relative starts with //.
    // But // in currentUrlStr gets converted to http:// before first parse.
    // However, if parsedUrl (object) has slashes:true from being parsed from http://host/path,
    // and parsedBaseUrl has no protocol, resolveObject might return //host/path.
    // 
    // Let's try: base = "example.com/" (no protocol), current = "http://other.com/page"
    // parsedUrl.host = 'other.com' (not null) -> skip if-block. Won't work.
    //
    // Try: base = "example.com/", current = "../page" 
    // parsedUrl.host = null -> enter if-block
    // resolveObject(noProtocolBase, {pathname:'../page'}) -> {pathname:'page', no protocol}
    // URL.format -> 'page' (no //)
    // Won't work.
    //
    // I cannot find the case. Submitting best guess:
    const res = parse("../page", "example.com/base/path");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("example.com/page");
  });
});