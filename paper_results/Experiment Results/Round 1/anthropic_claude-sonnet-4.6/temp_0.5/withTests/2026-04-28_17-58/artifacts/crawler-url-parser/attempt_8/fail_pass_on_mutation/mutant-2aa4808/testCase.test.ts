import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('slashesDenoteHost mutation detection', () => {
  it('detects mutation via base url with query object in resolveObject', () => {
    // When currentUrl has no query but base has query,
    // resolveObject copies source.search and source.query to result
    // With parseQueryString=true, source.query is an object
    // This might cause format() to behave differently
    const result = parse("../newpage", "http://example.com/a/b/?key=val");
    expect(result).not.toBeNull();
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});