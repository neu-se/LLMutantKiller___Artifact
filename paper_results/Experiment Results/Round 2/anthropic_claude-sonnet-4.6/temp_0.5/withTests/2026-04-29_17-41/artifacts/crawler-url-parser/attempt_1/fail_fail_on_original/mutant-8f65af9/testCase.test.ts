import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract text property for new URLs', () => {
  it('should set text to empty string when anchor has null-equivalent text', () => {
    // The mutation changes: text == null ? "" : text  to  false ? "" : text
    // Both return `text` when text is not null, but when text IS null:
    // original returns "", mutant returns null
    // We need to trigger this with a null text value
    // Since cheerio's .text() returns string, we use a cheerio object with overridden behavior
    const cheerio = require('cheerio');
    const $ = cheerio.load('<a href="http://www.example.com/page">Link Text</a>');
    
    // Override the text method to return null for testing
    const originalText = $.fn.text;
    $.fn.text = function() { return null; };
    
    const result = extract($, 'http://www.example.com/');
    
    $.fn.text = originalText;
    
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].text).toBe('');
  });
});