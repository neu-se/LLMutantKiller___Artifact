import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from "cheerio";

describe("extract text handling with null text", () => {
  it("should use empty string when text is null", () => {
    const $ = cheerio.load('<a href="http://example.com/page">hello</a>');
    
    // Override the text method to return null for testing
    const originalText = $.fn.text;
    $.fn.text = function() {
      return null as any;
    };
    
    const results = extract($, "http://example.com/");
    
    expect(results[0].text).toBe("");
    expect(results[0].text).not.toBe("Stryker was here!");
  });
});