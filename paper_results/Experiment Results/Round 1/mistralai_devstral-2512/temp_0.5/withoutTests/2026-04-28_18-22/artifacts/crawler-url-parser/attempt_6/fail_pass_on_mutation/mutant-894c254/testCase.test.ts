import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should handle UTM parameters with case-sensitive regex", () => {
    const urlWithUtm = "http://example.com/path?UTM_campaign=test&ref=abc&other=value";
    const result = parse(urlWithUtm);

    expect(result).not.toBeNull();
    if (result) {
      // This test expects the UTM parameter to remain because the mutation removes case-insensitivity
      expect(result.url).toContain("UTM_campaign");
      expect(result.search).toContain("UTM_campaign");
    }
  });
});