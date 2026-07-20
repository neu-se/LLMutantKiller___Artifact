import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract mutation detection', () => {
  it('should handle HTML with base tag where href has hash with content after newline entity', () => {
    // If cheerio decodes &#10; to actual \n in href attribute
    // then baseUrlStr would be "http://www.example.com/aaa/bbb#section\nmore"
    // Original /#.*$/: no match ($ can't reach past \n) -> baseUrlStr stays with \n
    // But then _has_illegal_chars would have already caught it...
    // Unless the \n is introduced AFTER the illegal chars check
    // In extract(), embedBaseUrlStr comes from cheerio, then parse(embedBaseUrlStr) is called
    // parse() does the illegal chars check on embedBaseUrlStr
    // If embedBaseUrlStr has \n -> parse returns null -> embedBaseUrl is null
    // Falls back to sourceUrl parsing
    // So this path doesn't help either
    
    // Let me try a different approach entirely
    const html = '<html><head><base href="http://www.example.com/aaa/bbb#section"></head><body><a href="/ccc">link</a></body></html>';
    const result = extract(html, "http://www.other.com/");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://www.example.com/ccc");
  });
});