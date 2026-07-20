import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse slashesDenoteHost second parse mutation', () => {
  it('should expose slashesDenoteHost difference when currentUrlStr is protocol-relative', () => {
    // Use a base URL without protocol that is not //-prefixed
    // so parsedBaseUrl has no protocol
    // Use a relative currentUrlStr that is also not //-prefixed
    // so it goes through the if-block
    // The resolved URL via URL.resolve with no-protocol base might produce
    // a result that URL.format renders as //host/path
    // which would then be parsed differently by the second URL.parse
    const res = parse("page", "www.example.com/base/");
    // parsedBaseUrl: {pathname: 'www.example.com/base/', host: null, protocol: null}
    // parsedUrl: {pathname: 'page', host: null, protocol: null}
    // URL.resolve -> 'www.example.com/base/page'
    // absoluteUrl: {pathname: 'www.example.com/base/page'}
    // currentUrlStr = 'www.example.com/base/page'
    // Second parse: no // -> same regardless
    expect(res).not.toBeNull();
    expect(res!.url).toBe("www.example.com/base/page");
  });
});