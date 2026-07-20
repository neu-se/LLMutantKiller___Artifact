import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with query string querycount', () => {
  it('should correctly count query parameters using parsed query object', () => {
    const result = parse("http://www.example.com/path?q1=data1&q2=data2");
    // With parseQueryString=true, query is parsed as object {q1:'data1', q2:'data2'}
    // and URL.format uses the query object to reconstruct the search string
    // The querycount relies on search.split("=").length - 1
    // Both mutations may produce same querycount, but the url field differs
    // when query contains encoded characters or special chars
    // Let's test with a URL where re-encoding matters
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
    expect(result!.search).toBe("?q1=data1&q2=data2");
    expect(result!.url).toBe("http://www.example.com/path?q1=data1&q2=data2");
  });
});