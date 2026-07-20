import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle URL with fragment correctly', () => {
    // Testing with a URL that has content after newline in fragment
    // The illegal chars check happens BEFORE the replace, so \n in URL → null
    // But what if we pass a URL where the first replace (mutation) matters?
    // Let's try: currentUrlStr after stripping "//" prefix might have "#" 
    // For "//example.com/path#frag", after stripping "//" → "example.com/path#frag"
    // /#.*$/ → "example.com/path"
    // /#.*/ → "example.com/path"  
    // Same...
    
    // I'll try the most basic test and see
    const result = parse('http://example.com/path#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
  });
});