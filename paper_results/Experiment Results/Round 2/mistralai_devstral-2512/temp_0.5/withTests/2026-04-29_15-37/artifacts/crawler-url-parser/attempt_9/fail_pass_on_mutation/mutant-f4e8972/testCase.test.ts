import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function type checking", () => {
  it("should use cheerio.load for string input", () => {
    const htmlString = '<html><body><a href="http://test.com">Test</a></body></html>';
    const result = extract(htmlString, "http://base.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://test.com/");
  });
});