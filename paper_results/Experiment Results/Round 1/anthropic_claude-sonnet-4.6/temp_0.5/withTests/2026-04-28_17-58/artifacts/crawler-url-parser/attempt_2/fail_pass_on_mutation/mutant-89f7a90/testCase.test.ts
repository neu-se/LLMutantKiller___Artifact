import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should correctly resolve relative URL when baseUrl has a fragment', () => {
    // baseUrl has a fragment - original code strips it to get clean base
    // mutated code replaces "#section" with "Stryker was here!" making an invalid URL
    // The relative URL "ddd" should resolve relative to the clean base path
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    // Original: baseUrlStr becomes "http://www.stackoverflow.com/aaa/bbb/ccc"
    // so "ddd" resolves to "http://www.stackoverflow.com/aaa/bbb/ddd"
    // Mutated: baseUrlStr becomes "http://www.stackoverflow.com/aaa/bbb/cccStryker was here!"
    // which when parsed by URL.parse has a different path, causing different resolution
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});