import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from "cheerio";

describe("extract function with cheerio object input", () => {
  it("should correctly extract URLs when passed a pre-parsed cheerio object instead of a string", () => {
    const htmlString = `<html>
      <body>
        <a href="http://www.example.com/page1">Link 1</a>
        <a href="http://www.example.com/page2">Link 2</a>
        <a href="http://www.other.com/page3">Link 3</a>
      </body>
    </html>`;

    const sourceUrl = "http://www.example.com/";

    // First, get the result when passing a string (reference result)
    const resultFromString = extract(htmlString, sourceUrl);

    // Now pass a pre-parsed cheerio object
    const $ = cheerio.load(htmlString);
    const resultFromCheerio = extract($, sourceUrl);

    // Both should produce the same number of URLs
    expect(resultFromCheerio.length).toBe(resultFromString.length);

    // The URLs extracted should match
    const urlsFromString = resultFromString.map((r: { url: string }) => r.url).sort();
    const urlsFromCheerio = resultFromCheerio.map((r: { url: string }) => r.url).sort();
    expect(urlsFromCheerio).toEqual(urlsFromString);
  });
});