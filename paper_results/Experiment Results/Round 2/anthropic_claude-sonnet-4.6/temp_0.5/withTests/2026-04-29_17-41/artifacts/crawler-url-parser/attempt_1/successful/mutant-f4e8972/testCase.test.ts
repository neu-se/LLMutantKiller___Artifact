import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from "cheerio";

describe("extract function with cheerio object as data", () => {
  it("should correctly extract links when passed a pre-loaded cheerio object instead of a string", () => {
    const html = `<html><body>
      <a href="http://www.example.com/page1">Link 1</a>
      <a href="http://www.example.com/page2">Link 2</a>
      <a href="http://www.other.com/page3">Link 3</a>
    </body></html>`;

    // Load the HTML into a cheerio object first
    const $ = cheerio.load(html);

    // Pass the cheerio object directly (not a string)
    const result = extract($, "http://www.example.com/");

    // With original code: data is not a string, so $ is used directly -> finds 3 links
    // With mutated code: true ? cheerio.load($) : $ -> cheerio.load on a cheerio object
    // produces different DOM structure, likely finding 0 or different links
    expect(result.length).toBe(3);
  });
});