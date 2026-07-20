import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function with baseUrl containing fragment', () => {
  it('should set baseurl correctly when baseUrl contains a fragment', () => {
    // Use an absolute URL as currentUrlStr so parsedUrl.host is not null
    // Then baseurl is set from parsedBaseUrl which is parsed from the (possibly mutated) baseUrlStr
    const result = parse('http://example.com/newpage', 'http://example.com/path#section');
    expect(result).not.toBeNull();
    // ret.baseurl is set only when parsedUrl.host == null, so let's use a relative URL
    // Actually let's use a relative path so we hit the baseurl assignment
    const result2 = parse('newpage.html', 'http://example.com/path#section');
    expect(result2).not.toBeNull();
    expect(result2!.baseurl).toBe('http://example.com/path');
  });
});