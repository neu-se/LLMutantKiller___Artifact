import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should resolve relative URL correctly when current URL has a fragment with 2+ chars', () => {
    // When parsedUrl.host == null and baseUrlStr exists, URL.resolve is used
    // currentUrlStr = "page#ab" (relative)
    // Original: removes "#ab" -> "page", URL.resolve(base, "page") works correctly
    // Mutant: removes "#a" -> "pageb", URL.resolve(base, "pageb") resolves to different path
    // BUT wait - URL.parse("page#ab") has host=null, so we enter the resolution branch
    // In that branch, parsedUrl still has hash="#ab", but delete parsedUrl.hash removes it
    // Then URL.resolve(parsedBaseUrl, parsedUrl) - parsedUrl has no hash now
    // Hmm, but currentUrlStr was already modified before URL.parse...
    // On mutant: currentUrlStr = "pageb" (no hash), URL.parse -> host=null, enters branch
    // URL.resolve(base, {pathname:"pageb"}) -> "http://example.com/base/pageb"
    // On original: currentUrlStr = "page", URL.resolve -> "http://example.com/base/page"
    const result = parse('page#ab', 'http://example.com/base/');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/base/page');
  });
});