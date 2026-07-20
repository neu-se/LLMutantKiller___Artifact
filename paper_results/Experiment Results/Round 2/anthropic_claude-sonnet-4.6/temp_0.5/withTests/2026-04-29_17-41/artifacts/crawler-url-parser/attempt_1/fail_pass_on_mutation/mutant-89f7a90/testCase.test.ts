import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should strip fragment from baseUrl when resolving relative URLs', () => {
    // The mutation changes the fragment stripping replacement from '' to "Stryker was here!"
    // When baseUrlStr contains a fragment like "#section", the original code strips it to ""
    // The mutated code replaces it with "Stryker was here!" which corrupts the base URL
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    // With original code: baseUrlStr becomes "http://www.stackoverflow.com/aaa/bbb/ccc"
    // and relative URL "ddd" resolves against it properly
    // With mutated code: baseUrlStr becomes "http://www.stackoverflow.com/aaa/bbb/cccStryker was here!"
    // which has illegal chars and causes parse to return null or resolve incorrectly
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});