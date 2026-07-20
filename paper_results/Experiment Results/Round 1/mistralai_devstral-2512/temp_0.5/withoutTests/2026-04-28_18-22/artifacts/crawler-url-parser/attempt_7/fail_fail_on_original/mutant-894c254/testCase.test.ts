import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should remove UTM parameters with case-insensitive regex", () => {
    const urlWithUpperCaseUtm = "http://example.com/path?UTM_CAMPAIGN=test&ref=abc&other=value";
    const result = parse(urlWithUpperCaseUtm);

    expect(result).not.toBeNull();
    if (result) {
      // Original code with case-insensitive regex should remove UTM_CAMPAIGN
      expect(result.url).not.toContain("UTM_CAMPAIGN");
      expect(result.search).not.toContain("UTM_CAMPAIGN");
      expect(result.url).toContain("other=value");
    }
  });
});