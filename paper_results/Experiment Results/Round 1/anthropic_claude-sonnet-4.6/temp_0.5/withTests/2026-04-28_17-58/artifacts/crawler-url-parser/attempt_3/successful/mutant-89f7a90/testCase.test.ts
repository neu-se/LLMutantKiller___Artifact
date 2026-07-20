import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should set baseurl field to the fragment-stripped base URL', () => {
    // When a relative URL is parsed with a baseUrl that has a fragment,
    // the returned result.baseurl should be the clean base URL (fragment removed)
    // Original: baseUrlStr becomes "http://www.stackoverflow.com/aaa/bbb/ccc"
    //   so result.baseurl = "http://www.stackoverflow.com/aaa/bbb/ccc"
    // Mutated: baseUrlStr becomes "http://www.stackoverflow.com/aaa/bbb/cccStryker was here!"
    //   so result.baseurl would contain "Stryker was here!" text
    const result = parse("./ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#fragment");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc");
  });
});