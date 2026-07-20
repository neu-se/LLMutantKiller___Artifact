import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative url with base url - slashesDenoteHost', () => {
  it('should correctly parse baseurl when base url starts with //', () => {
    // baseUrlStr = "//www.stackoverflow.com/aaa/bbb/ccc/" gets converted to "http://www.stackoverflow.com/aaa/bbb/ccc/"
    // but what about a base URL that has slashes in a way that matters?
    // Let's try passing a base URL that starts with // directly to see if the replacement + parse differs
    const result = parse("/ddd", "//www.stackoverflow.com/aaa/bbb/ccc/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/ddd");
  });
});