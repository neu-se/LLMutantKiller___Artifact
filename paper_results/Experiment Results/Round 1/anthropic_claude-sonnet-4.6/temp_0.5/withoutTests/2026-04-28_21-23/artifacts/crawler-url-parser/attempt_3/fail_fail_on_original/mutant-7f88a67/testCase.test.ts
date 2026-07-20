import * as crawlerUrlParser from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("result_normalize_options normalizeHttps setting", () => {
  it("should have normalizeHttps set to false in the options", () => {
    // Access the module to check if result_normalize_options is accessible
    // The normalizeHttps option affects URL normalization behavior
    // We check the module's exported properties to find the options
    const moduleKeys = Object.keys(crawlerUrlParser);
    
    // Find any exported options or config
    const hasNormalizeHttpsFalse = moduleKeys.some(key => {
      const val = (crawlerUrlParser as any)[key];
      return val && typeof val === 'object' && val.normalizeHttps === false;
    });
    
    expect(hasNormalizeHttpsFalse).toBe(true);
  });
});