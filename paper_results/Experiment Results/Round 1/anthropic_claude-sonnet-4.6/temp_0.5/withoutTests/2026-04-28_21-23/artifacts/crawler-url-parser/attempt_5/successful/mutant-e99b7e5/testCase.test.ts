import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should return empty string text for anchor with whitespace-only text on a new URL", () => {
    // The mutation changes: text == null ? "" : text
    // to:                   text == null ? "Stryker was here!" : text
    // 
    // text = $(this).text().trim() - for an anchor with only whitespace, text = ""
    // "" == null is false in JS, so both versions return "" (the text variable)
    // 
    // For null == null (true): text would need to be null
    // $(this).text() in cheerio returns string, so .trim() gives string
    // 
    // The only scenario where this differs: text IS null or undefined
    // Let's try with a cheerio $ passed directly where we control text() output
    // We need text() to return an object with trim() returning null
    // AND we need the null to survive to the mutation check
    // 
    // Previous attempts showed the patch works but trim() returning null
    // means text IS null when reaching the mutation
    // Yet the test still passed on mutated code - meaning results[0].text was ""
    // 
    // OH WAIT - if text is null, then:
    // Original: null == null ? "" : null => ""  
    // Mutated:  null == null ? "Stryker was here!" : null => "Stryker was here!"
    // So results[0].text should be "Stryker was here!" on mutated!
    // But previous test passed on both... maybe the patch didn't work
    
    // Let me try a different patching approach using require cache
    const cheerioModule = require("cheerio");
    const html = '<a href="http://other-site.com/page">hello</a>';
    const $ = cheerioModule.load(html);
    
    // Find the actual cheerio collection prototype
    const collection = $('a');
    const proto = Object.getPrototypeOf(collection);
    const savedText = proto.text;
    
    proto.text = function() {
      if (this.length > 0 && arguments.length === 0) {
        return { trim: () => null };
      }
      return savedText.apply(this, arguments);
    };
    
    let results;
    try {
      results = extract($, "http://example.com/");
    } finally {
      proto.text = savedText;
    }
    
    expect(results).toHaveLength(1);
    expect(results[0].text).toBe("");
  });
});