import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract URLs with HTML-encoded newline in fragment', () => {
  it('should handle href with HTML-encoded newline after fragment', () => {
    // cheerio decodes &#10; to \n when reading attr('href')
    // So href="http://example.com/path#frag&#10;&#10;more" 
    // becomes "http://example.com/path#frag\n\nmore" after cheerio parsing
    // This bypasses _has_illegal_chars check!
    // Original /#.*$/: NO MATCH on "http://example.com/path#frag\n\nmore"
    //   -> second /#.*$/ also NO MATCH -> URL.parse sees # -> hash stripped by delete parsedUrl.hash
    // Mutated /#.*/: matches "#frag" -> "http://example.com/path\n\nmore"
    //   -> second /#.*$/ no # present -> URL.parse("http://example.com/path\n\nmore") -> different result
    const html = '<html><body><a href="http://example.com/path#frag&#10;&#10;more">link</a></body></html>';
    const result = extract(html, 'http://example.com/');
    // With original: # not stripped by replace, but URL.parse handles hash via delete parsedUrl.hash
    // URL.parse("http://example.com/path#frag\n\nmore") - what does this return?
    // The hash is deleted, so url would be "http://example.com/path"
    // With mutated: "http://example.com/path\n\nmore" -> URL.parse -> path includes \n\nmore
    // So results should differ!
    expect(result.length).toBeGreaterThan(0);
    const urlObj = result[0];
    expect(urlObj.url).toBe('http://example.com/path');
  });
});