import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract", () => {
  it("should handle protocol-relative links with no source URL", () => {
    const html = '<a href="//example.com">link</a>';
    const result = extract(html, null);
    expect(result).toHaveLength(1);
    expect(result[0].url).toMatch(/^http:/);
  });
});