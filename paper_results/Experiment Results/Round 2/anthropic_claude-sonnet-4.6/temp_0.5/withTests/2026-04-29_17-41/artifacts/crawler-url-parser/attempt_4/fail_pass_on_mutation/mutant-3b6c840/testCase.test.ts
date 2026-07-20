import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with trailing slash', () => {
  it('should keep trailing slash on root domain URL', () => {
    // Node URL.parse always adds trailing slash to root domain URLs
    // This tests the actual behavior of parse() which is unaffected by result_normalize_options
    const result = parse("http://www.example.com");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/");
  });
});