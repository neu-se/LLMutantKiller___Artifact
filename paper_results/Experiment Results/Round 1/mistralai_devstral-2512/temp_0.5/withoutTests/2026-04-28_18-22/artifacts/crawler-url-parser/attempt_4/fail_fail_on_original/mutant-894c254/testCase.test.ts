import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should remove UTM parameters with case-insensitive regex", () => {
    const urlWithUtm = "http://example.com/path?UtM_Campaign=test&ref=abc&other=value";
    const result = parse(urlWithUtm);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toContain("other=value");
      expect(result.url).not.toContain("UtM_Campaign");
      expect(result.search).toContain("other=value");
      expect(result.search).not.toContain("UtM_Campaign");
    }
  });
});