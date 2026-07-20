import * as crawlerUrlParser from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser result_normalize_options', () => {
  it('should export result_normalize_options with stripWWW set to true', () => {
    // The module exports result_normalize_options for external use
    // We need to verify that stripWWW is true in the original and false in the mutant
    
    // Since parse/extract don't seem to apply stripWWW internally,
    // let's check if the options object is exported
    const options = (crawlerUrlParser as any).result_normalize_options;
    
    if (options !== undefined) {
      expect(options.stripWWW).toBe(true);
    } else {
      // If not exported, we need another approach
      // Let's check the gettype function behavior which might be affected
      // by URL normalization with stripWWW
      
      // gettype compares domains/subdomains - if www is stripped,
      // www.example.com and example.com would be treated as same host
      // If www is NOT stripped, they'd be treated as different (subdomain vs domain)
      const linkType = crawlerUrlParser.gettype('http://www.example.com/page', 'http://example.com/page');
      // With stripWWW: true, both normalize to example.com, so type would be "samelevel"
      // With stripWWW: false, www.example.com has subdomain 'www', so type would be "subdomain"
      expect(linkType).toBe('samelevel');
    }
  });
});