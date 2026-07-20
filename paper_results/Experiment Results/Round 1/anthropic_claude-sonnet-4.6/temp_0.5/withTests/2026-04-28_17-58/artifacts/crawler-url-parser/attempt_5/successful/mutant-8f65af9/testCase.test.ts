import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
const cheerio = require("cheerio");

describe("extract function - text property when text is undefined", () => {
  it("should set text to empty string when anchor text trim returns undefined", () => {
    const $ = cheerio.load(`<html><body><a href="http://www.example.com/page">hello</a></body></html>`);
    
    // Patch trim to return undefined for anchor text
    const originalTrim = String.prototype.trim;
    let callCount = 0;
    String.prototype.trim = function() {
      callCount++;
      const result = originalTrim.call(this);
      if (result === "hello") {
        return undefined as any;
      }
      return result;
    };
    
    try {
      const result = extract($, "http://www.example.com/");
      const link = result.find((r: any) => r.url === "http://www.example.com/page");
      expect(link).toBeDefined();
      // Original: undefined == null ? "" : undefined => ""
      // Mutated: false ? "" : undefined => undefined
      expect(link!.text).toBe("");
    } finally {
      String.prototype.trim = originalTrim;
    }
  });
});