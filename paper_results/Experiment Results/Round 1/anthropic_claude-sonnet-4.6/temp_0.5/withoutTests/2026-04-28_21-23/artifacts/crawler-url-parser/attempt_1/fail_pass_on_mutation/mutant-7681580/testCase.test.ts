import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function URL prefix handling', () => {
  it('should correctly parse a plain domain URL without base URL by prepending http:// only at the start', () => {
    // This URL has no protocol and no base URL
    // The code should prepend 'http://' at the beginning
    // Original regex: /^(?!(?:\w+:)?\/\/)/ - anchored to start
    // Mutated regex: /(?!(?:\w+:)?\/\/)/ - not anchored, can match anywhere
    // For 'www.example.com', without ^ anchor, the regex matches at position 0
    // but for something like 'example.com/path', the mutation inserts http:// at wrong position
    
    // Test with a URL that would be affected by the anchor removal
    // 'example.com' - the mutated regex without ^ will match at first non-protocol position
    const result = parse('example.com');
    
    // The result should have a properly formed URL starting with http://
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/');
    expect(result!.protocol).toBe('http:');
    expect(result!.host).toBe('example.com');
  });
});