import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from "cheerio";

describe("extract function with cheerio object input", () => {
  it("should correctly extract links when passed a cheerio object instead of a string", () => {
    // Create a cheerio object with known links
    const htmlString = '<html><body><a href="http://example.com/page1">Page 1</a><a href="http://example.com/page2">Page 2</a></body></html>';
    const cheerioObject = cheerio.load(htmlString);
    
    const sourceUrl = "http://example.com/";
    
    // When data is a cheerio object, original code uses it directly
    // Mutated code calls cheerio.load(cheerioObject) which may produce different results
    const resultWithCheerioObject = extract(cheerioObject, sourceUrl);
    
    // Also extract from the string to compare expected behavior
    const resultWithString = extract(htmlString, sourceUrl);
    
    // Both should return the same URLs since they represent the same content
    const urlsFromCheerio = resultWithCheerioObject.map((r: any) => r.url).sort();
    const urlsFromString = resultWithString.map((r: any) => r.url).sort();
    
    expect(urlsFromCheerio).toEqual(urlsFromString);
  });
});