import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should resolve fragment-only URL to base URL path', () => {
    // currentUrlStr = '#ab' with baseUrlStr
    // Original: '#ab' -> /#.*$/ strips to '' -> URL.parse('') has no host
    //   -> URL.resolve(base, '') resolves to base itself
    // Mutated: '#ab' -> /#.$/ no match (2 chars after #) -> stays '#ab'
    //   -> URL.parse('#ab') has no host -> URL.resolve(base, '#ab')
    //   Node's url.resolve with fragment-only gives base + fragment
    //   but delete parsedUrl.hash removes it -> same base URL
    // Try with '#ab' where empty string resolve differs from '#ab' resolve
    const base = 'http://example.com/dir/page.html';
    const resultWithFragment = parse('#ab', base);
    const resultEmpty = parse('', base);
    // In original both should give same result (both become '')
    // In mutated '#ab' stays as '#ab' while '' stays ''
    expect(resultWithFragment).not.toBeNull();
    expect(resultWithFragment!.url).toBe(resultEmpty!.url);
  });
});