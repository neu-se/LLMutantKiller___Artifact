import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with string input", () => {
  it("should process HTML string and extract links correctly", () => {
    const html = '<html><body><a href="http://example.com/path">Example Link</a></body></html>';
    const result = extract(html, "http://example.com");
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://example.com/path");
    expect(result[0].text).toBe("Example Link");
  });
});