import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should correctly classify link types when base URL has query parameters", () => {
    const html = '<a href="http://other.example.com/page">Link</a>';
    const result = extract(html, "http://example.com/?q=1");
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("external");
  });
});