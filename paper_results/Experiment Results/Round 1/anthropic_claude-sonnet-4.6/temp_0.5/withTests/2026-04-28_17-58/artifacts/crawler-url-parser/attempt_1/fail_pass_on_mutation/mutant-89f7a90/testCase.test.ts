import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should strip fragment from baseUrl and correctly resolve relative URL', () => {
    // The mutation changes the fragment stripping replacement from '' to "Stryker was here!"
    // When baseUrlStr contains a fragment like "http://www.example.com/aaa/bbb#section",
    // the original code strips it to "http://www.example.com/aaa/bbb"
    // The mutated code replaces it with "http://www.example.com/aaa/bbStryker was here!"
    // which contains illegal characters and causes parse to return null
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc#section");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});