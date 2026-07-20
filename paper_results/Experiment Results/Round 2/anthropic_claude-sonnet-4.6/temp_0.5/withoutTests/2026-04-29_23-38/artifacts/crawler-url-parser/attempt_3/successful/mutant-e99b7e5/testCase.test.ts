import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should set text to empty string (not 'Stryker was here!') when anchor text resolves to null", () => {
    const cheerio = require("cheerio");
    const $ = cheerio.load('<a href="http://example.com/page">test</a>');
    
    // Override text to return an object whose trim() returns null
    $.fn.text = function() {
      return { trim: () => null };
    };
    
    const results = extract($, "http://example.com/");
    expect(results[0].text).toBe("");
  });
});