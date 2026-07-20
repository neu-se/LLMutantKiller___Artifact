import * as cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('normalizeHttps option in result_normalize_options', () => {
  it('should have normalizeHttps set to false in the options', () => {
    // The result_normalize_options object defines normalizeHttps
    // When false: https URLs stay as https
    // When true (mutant): https URLs get normalized to http
    // We can detect this by checking if the module's behavior differs
    // by parsing an https URL and verifying the protocol field
    const result = cup.parse("https://subdomain.example.com/path?q=1");
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://subdomain.example.com/path?q=1");
  });
});