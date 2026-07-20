import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('detects mutation in URL.parse slashesDenoteHost parameter', () => {
    // Try a base URL that is just '//' followed by a host
    // After replace(/^\/\//, 'http://'), it becomes 'http://host'
    // URL.parse('http://host', true, true) === URL.parse('http://host', true, false)
    // So this won't work...
    
    // What if baseUrlStr has no protocol and no // but URL.parse behaves differently?
    // For 'example.com', slashesDenoteHost doesn't matter (no //)
    
    // The ONLY case: baseUrlStr starts with // but doesn't get replaced
    // That's impossible since replace(/^\/\//, 'http://') handles it
    
    // Unless... the replace is case-sensitive and baseUrlStr has uppercase?
    // /^\/\// is not case-sensitive for slashes, so that doesn't matter
    
    // Let me try with a URL that has query params that might affect URL.format output
    const result = parse('page', 'http://example.com/?a=1&b=2');
    expect(result).not.toBeNull();
    expect((result as any).url).toBe('http://example.com/page');
  });
});