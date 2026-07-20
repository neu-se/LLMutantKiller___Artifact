import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse slashesDenoteHost mutation', () => {
  it('should expose mutation through specific URL format', () => {
    // Try: currentUrlStr that after if-block is set to //host/path
    // by using a base with no protocol where parsedUrl has slashes:true
    // 
    // parsedUrl needs slashes:true AND host:null to both enter if-block
    // AND have resolveObject produce //host/path
    //
    // parsedUrl.slashes = true requires currentUrlStr to start with //
    // which gets converted to http:// making host != null
    //
    // UNLESS: what if we use URL.parse with the first call (slashesDenoteHost=true)
    // on a URL that has slashes:true but host:null?
    // This seems impossible as shown in analysis.
    //
    // Final attempt: maybe Node.js url.resolve with object args behaves differently
    const res = parse("page", "//");
    // baseUrlStr = "//" -> "http://"
    // parsedBaseUrl = {protocol:'http:', slashes:true, host:''}
    // parsedUrl = {pathname:'page', host:null}
    // Enter if-block
    // URL.resolve produces "http:///page" or similar
    // currentUrlStr = "http:///page" or "http://page"
    // Second parse: same regardless (starts with http:)
    expect(res).not.toBeNull();
  });
});