import cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('result_normalize_options configuration', () => {
  it('normalizeHttps should be false in the options configuration', () => {
    // The result_normalize_options object affects behavior through the module
    // We can detect this by checking if the module object contains the options
    const moduleKeys = Object.keys(cup);
    // If normalizeHttps:true, the module behavior changes - test by checking
    // that the options are accessible and correctly set
    expect(cup).toBeDefined();
    // Parse an https URL and verify protocol field reflects normalizeHttps:false
    const result = cup.parse("https://sub.example.com/path");
    expect(result.protocol).toEqual("https:");
  });
});