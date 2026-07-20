import * as crawlerUrlParser from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser result_normalize_options', () => {
  it('should have stripWWW set to true in result_normalize_options', () => {
    // The result_normalize_options object controls URL normalization behavior.
    // With stripWWW: true, parsing a www URL should result in subdomain being null/empty
    // because www gets stripped during normalization before psl.parse processes the host.
    // With stripWWW: false, subdomain would be 'www'.
    
    // Test by parsing a www URL and checking the subdomain field
    const result = crawlerUrlParser.parse('http://www.google.com/');
    
    expect(result).not.toBeNull();
    // With stripWWW: true, www is stripped so subdomain should be null
    // With stripWWW: false, subdomain should be 'www'
    expect(result!.subdomain).toBeNull();
  });
});