import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function with baseUrl containing fragment', () => {
  it('should correctly resolve relative URL when baseUrl contains a fragment', () => {
    // When baseUrl has a fragment like #section, the original strips it to empty string
    // The mutation replaces it with "Stryker was here!" which corrupts the baseUrl
    // This should cause the resolved URL to be different or null in the mutated version
    const result = parse('/newpage', 'http://example.com/#section');
    expect(result).not.toBeNull();
    // The host should be example.com, not corrupted
    expect(result!.host).toBe('example.com');
    // The URL should not contain the mutation string
    expect(result!.url).toBe('http://example.com/newpage');
  });
});