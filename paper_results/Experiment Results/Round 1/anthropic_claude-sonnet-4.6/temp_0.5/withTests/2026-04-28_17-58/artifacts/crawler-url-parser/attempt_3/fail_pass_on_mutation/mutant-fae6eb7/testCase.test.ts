import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse baseUrl hash stripping with trailing content', () => {
  it('should strip hash from baseUrl containing only a hash symbol', () => {
    // "#abcd" as baseUrl - after stripping hash, becomes ""
    // Original /#.*$/ : matches "#abcd" -> ""  
    // Mutated /#.*/ : matches "#abcd" -> ""
    // Same... 
    // But wait - what does URL.parse do with "" as baseUrl?
    const result = parse("http://www.google.com", "#abcd");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.google.com/");
  });
});