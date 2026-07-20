import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('resolve relative URL inheriting base query string behavior', () => {
  it('should correctly handle query string inheritance when resolving relative URLs', () => {
    // Use a relative URL with no query against base with query
    // Check the final resolved url field (not baseurl)
    const result = parse("../ddd", "http://www.stackoverflow.com/aaa/bbb/ccc?q=1&r=2");
    expect(result).not.toBeNull();
    // The resolved URL should be http://www.stackoverflow.com/aaa/ddd
    // Original (true): base.query={q:'1',r:'2'}, base.search=null
    //   -> resolveObject uses base.query -> result might have query
    // Mutated (false): base.query=null, base.search='?q=1&r=2'  
    //   -> resolveObject uses base.search -> result might have search
    expect(result!.search).toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/ddd");
  });
});