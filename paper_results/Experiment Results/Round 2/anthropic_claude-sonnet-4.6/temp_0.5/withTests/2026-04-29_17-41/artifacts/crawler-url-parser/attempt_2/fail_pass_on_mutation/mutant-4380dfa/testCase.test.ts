import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('mutation detection for double-slash replacement in no-baseUrl path', () => {
  it('should return http URL when parsing a protocol-relative URL as the base URL itself', () => {
    // The baseUrlStr goes through: replace(/^\/\//, 'http://') when baseUrlStr exists
    // But what about when baseUrlStr is "//www.example.com" - it gets converted to http
    // The mutation is in the ELSE branch (no baseUrl)
    // After first unconditional replace, "//x" -> "http://x"
    // Then in else branch, "http://x" matches \w+: so inner if doesn't fire
    // So mutation is truly unreachable? Let me check if there's an edge case...
    // What about empty string baseUrl? baseUrl="" is falsy, goes to else
    // currentUrlStr="//www.example.com" -> after first replace -> "http://www.example.com"
    // "http://www.example.com" matches \w+: so inner if doesn't fire
    // Mutation seems unreachable via normal paths
    // BUT: what if currentUrlStr after first replace is something like "http:////www.example.com"?
    // That would require original to be "////www.example.com"
    // First replace: "////www.example.com" -> "http:////www.example.com" (only replaces first //)
    // Wait no - /^\/\// only matches if starts with //
    // "////www.example.com" starts with //, so -> "http:////www.example.com"  
    // "http:////www.example.com" - does it match \w+:? Yes! "http:" matches
    // So inner if still doesn't fire. Mutation unreachable.
    const res = parse("//www.example.com/page");
    expect(res).not.toBeNull();
    expect(res.protocol).toBe('http:');
    expect(res.host).toBe('www.example.com');
  });
});