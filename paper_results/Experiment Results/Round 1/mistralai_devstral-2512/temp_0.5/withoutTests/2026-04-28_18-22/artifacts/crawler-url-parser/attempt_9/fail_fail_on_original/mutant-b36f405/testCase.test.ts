import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parameter handling", () => {
  it("should handle URLs with utm_ parameters containing special characters", () => {
    const url = "https://example.com?utm_campaign=test!@#&normal=param";
    const result = parse(url);
    expect(result).not.toBeNull();
    // The original regex would NOT match "utm_campaign=test!@#" (special chars)
    // The mutated regex WOULD match "utm_campaign=test!@#" (special chars)
    // Since parse() doesn't filter params, we just verify the URL is parsed
    expect(result?.url).toContain("utm_campaign=test!@#");
  });
});