import * as cheerio from "cheerio";
import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function - text property when anchor text is null", () => {
  it("should set text to empty string when anchor text is null, not 'Stryker was here!'", () => {
    const $ = cheerio.load('<a href="http://other-site.com/page">hello</a>');
    
    // Monkey-patch the text method on the matched element to return null
    const originalText = $.fn.text;
    $.fn.text = function(...args: any[]) {
      if (args.length === 0) {
        return null as any;
      }
      return originalText.apply(this, args);
    };

    const results = extract($, "http://example.com/");

    expect(results).toHaveLength(1);
    expect(results[0].text).toBe("");
    expect(results[0].text).not.toBe("Stryker was here!");
  });
});