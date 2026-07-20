import { extract } from "../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should correctly handle hrefs with length less than 3", () => {
    const data = '<a href="ab">Link</a>';
    const sourceUrl = "http://example.com";
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});