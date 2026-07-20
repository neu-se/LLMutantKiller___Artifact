import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with query string - slashesDenoteHost behavior', () => {
  it('should correctly parse host from protocol-relative URL used as currentUrlStr in second parse', () => {
    // After relative URL resolution with a base URL, the resulting currentUrlStr
    // is formatted as http://... so we need a case where the second URL.parse
    // sees a URL where slashesDenoteHost matters.
    // The relative URL "ddd" with base "http://www.stackoverflow.com/aaa/bbb/ccc"
    // resolves to "http://www.stackoverflow.com/aaa/bbb/ddd"
    // The host should be correctly parsed
    const res = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc");
    expect(res).not.toBeNull();
    expect(res!.host).toBe("www.stackoverflow.com");
    expect(res!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});