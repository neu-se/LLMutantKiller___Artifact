import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with string vs non-string input", () => {
  it("should process string input through cheerio.load but not non-string input", () => {
    const htmlString = '<html><body><a href="http://example.com">Link</a></body></html>';
    const result = extract(htmlString, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/");
  });
});