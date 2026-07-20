import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import * as cheerio from 'cheerio';

describe("extract function", () => {
  it("should correctly handle when data is already a cheerio object", () => {
    const html = '<a href="/test">Test Link</a>';
    const cheerioObject = cheerio.load(html);

    // This test will pass on original code (where cheerio objects are used directly)
    // but fail on mutated code (where cheerio.load is always called, breaking existing cheerio objects)
    const result = extract(cheerioObject, "https://example.com");
    expect(result).toEqual([{
      url: "https://example.com/test",
      text: "Test Link",
      type: "sublevel"
    }]);
  });
});