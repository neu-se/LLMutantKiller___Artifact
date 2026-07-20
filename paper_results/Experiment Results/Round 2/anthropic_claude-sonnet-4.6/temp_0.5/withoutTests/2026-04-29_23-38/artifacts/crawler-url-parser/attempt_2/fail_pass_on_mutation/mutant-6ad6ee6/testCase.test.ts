import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should completely remove a multi-character fragment from URL', () => {
    // Original: /#.*$/ removes "#ab" entirely -> "http://example.com/page"
    // Mutated: /#.$/ removes only "#a" leaving "b" -> "http://example.com/pageb"
    // URL.parse treats "b" as part of the pathname since there's no slash
    const result = parse('http://example.com/page#ab');
    
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/page');
  });
});