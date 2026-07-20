import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should correctly resolve relative URL when baseUrl has a fragment', () => {
    // baseUrl has a fragment - original strips it, mutant replaces with "Stryker was here!"
    // The corrupted base URL causes URL.resolve to produce a different path
    const result = parse("/ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("www.stackoverflow.com");
    expect(result!.url).toBe("http://www.stackoverflow.com/ddd");
  });
});