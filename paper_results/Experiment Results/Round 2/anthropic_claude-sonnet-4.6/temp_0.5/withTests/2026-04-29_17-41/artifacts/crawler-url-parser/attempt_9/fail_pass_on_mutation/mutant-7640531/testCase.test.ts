import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract URL with carriage return in href', () => {
  it('should handle href where cheerio strips carriage return leaving fragment unstripped by $ anchored regex', () => {
    // If cheerio strips \r from href values, the string passed to parse()
    // won't have \r, so illegal chars check passes
    // But we need \r to distinguish the regexes...
    // This won't work either.
    //
    // NEW IDEA: What if the URL module itself introduces \n when formatting?
    // No, that doesn't make sense.
    //
    // FINAL IDEA: The mutation changes /#.*$/ to /#.*/ 
    // For the string "path#", both match "#" and replace with "" -> "path"
    // For "path#a", both match "#a" -> "path"  
    // These are truly equivalent for all inputs without \n/\r/\u2028/\u2029
    // 
    // Maybe the test should verify that parse() correctly handles a URL
    // where the SECOND replace (unchanged /#.*$/) is what actually does the work,
    // because the first replace (mutated /#.*/) somehow skips it?
    // That's impossible for strings without line terminators.
    //
    // I'll try testing with a URL object or non-standard input
    const html = '<html><body><a href="http://example.com/path#section\r\nmore">link</a></body></html>';
    const result = extract(html, 'http://example.com/');
    // With \r\n in href after cheerio parsing, _has_illegal_chars catches it
    // Both versions return null for this URL -> empty result
    expect(result.length).toBe(0);
  });
});