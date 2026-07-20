import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from "cheerio";

describe("extract function with cheerio object input", () => {
  it("should correctly extract links when passed a pre-loaded cheerio object instead of a string", () => {
    const html = '<html><body><a href="http://example.com/page">Example Page</a></body></html>';
    const $ = cheerio.load(html);
    
    const result = extract($, "http://example.com/");
    
    // In the original code, $ is used directly as a cheerio object
    // In the mutated code, cheerio.load($) is called on the function, which won't parse the links correctly
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/page");
    expect(result[0].text).toBe("Example Page");
  });
});