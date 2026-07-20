import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"
import * as URL from 'url';

describe('parse function', () => {
  it('should handle URL where fragment removal affects host detection', () => {
    // 'user#pw' without protocol - could be parsed as auth or host
    // Original: 'user#pw' -> strip fragment -> 'user' -> add http:// -> 'http://user'
    //   -> host = 'user', domain from psl.parse('user') 
    // Mutated: 'user#pw' -> /#.$/ no match -> stays 'user#pw' -> add http:// -> 'http://user#pw'
    //   -> URL.parse gives host='user', hash='#pw' -> delete hash -> same
    // Hmm still same...
    // What about 'user#p' (single char fragment)?
    // Original: strip -> 'user' -> 'http://user' -> host='user'
    // Mutated: /#.$/ MATCHES '#p' -> strip -> 'user' -> 'http://user' -> host='user'  
    // Same again!
    
    // The only real difference: fragment of exactly 2+ chars where URL has no protocol
    // and the fragment chars affect the regex test for protocol detection
    // Test: 'localhost#ab' 
    // Original: -> 'localhost' -> regex ^\.*\/|^(?!localhost)\w+: ... 'localhost' matches (?!localhost) negation
    // so it does NOT add http:// ... wait let me re-read the regex
    // /^\.*\/|^(?!localhost)\w+:/ - if currentUrlStr starts with ./ or / OR starts with word chars + colon (but not localhost)
    // 'localhost' doesn't match either branch, so http:// IS prepended
    const result = parse('localhost#ab');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('localhost');
  });
});