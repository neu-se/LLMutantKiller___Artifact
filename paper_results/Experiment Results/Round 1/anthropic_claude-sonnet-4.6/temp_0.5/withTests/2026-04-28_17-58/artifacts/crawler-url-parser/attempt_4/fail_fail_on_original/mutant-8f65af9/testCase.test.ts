import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
const cheerio = require("cheerio");

describe("extract function - text when null text anchor", () => {
  it("should set text to empty string when anchor text is null via cheerio object", () => {
    const $ = cheerio.load(`<html><body><a href="http://www.example.com/page"></a></body></html>`);
    
    // Monkey-patch the cheerio instance to return null for text()
    const originalText = $.fn.text;
    $.fn.text = function() {
      const result = originalText.apply(this, arguments);
      if (arguments.length === 0 && this.is && this.is('a')) {
        return null;
      }
      return result;
    };
    
    const result = extract($, "http://www.example.com/");
    
    const link = result.find((r: any) => r.url === "http://www.example.com/page");
    expect(link).toBeDefined();
    // Original: null == null ? "" : null => ""
    // Mutated: false ? "" : null => null
    expect(link!.text).toBe("");
  });
});