import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract text handling when text is null', () => {
  it('should set text to empty string when anchor text resolves to null', () => {
    const originalTrim = String.prototype.trim;
    String.prototype.trim = function() { return null as any; };
    
    let result: any[];
    try {
      result = extract('<a href="http://www.example.com/page">hello</a>', 'http://www.other.com/');
    } finally {
      String.prototype.trim = originalTrim;
    }
    
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].text).toBe('');
  });
});