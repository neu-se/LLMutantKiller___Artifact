import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with string input", () => {
  it("should process string input through cheerio.load", () => {
    const htmlString = '<html><body><a href="http://test.com">Test</a></body></html>';
    const result = extract(htmlString, "http://base.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://test.com/");
    expect(result[0].text).toBe("Test");
  });
});