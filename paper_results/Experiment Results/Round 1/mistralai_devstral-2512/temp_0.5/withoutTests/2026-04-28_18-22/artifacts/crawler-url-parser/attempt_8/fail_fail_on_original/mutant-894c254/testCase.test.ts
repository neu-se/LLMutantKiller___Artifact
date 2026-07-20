import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should handle mixed case UTM parameters", () => {
    const urlWithMixedCaseUtm = "http://example.com/path?UtM_CaMpAiGn=test&ref=abc&other=value";
    const result = parse(urlWithMixedCaseUtm);

    expect(result).not.toBeNull();
    if (result) {
      // The original code with case-insensitive regex should remove UtM_CaMpAiGn
      // The mutated code with case-sensitive regex would keep it
      expect(result.url).not.toContain("UtM_CaMpAiGn");
      expect(result.search).not.toContain("UtM_CaMpAiGn");
      expect(result.url).toContain("other=value");
    }
  });
});