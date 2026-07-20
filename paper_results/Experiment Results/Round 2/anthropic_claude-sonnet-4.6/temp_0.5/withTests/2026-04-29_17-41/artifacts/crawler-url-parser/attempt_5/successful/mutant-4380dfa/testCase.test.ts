import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse - detect mutation in else branch', () => {
  it('should parse URL correctly through else branch with inner if', () => {
    // Try a URL that doesn't match ^\.*\/ or ^(?!localhost)\w+:
    // and after inner replace, check if placeholder matters
    // What about a URL like "//example.com" where:
    // - first replace: "//example.com" -> "http://example.com"  
    // - else branch: inner if doesn't fire (matches \w+:)
    // - placeholder: no // at start
    // OR what about passing baseUrlStr as "0" (truthy)?
    // parse("//example.com", "0"):
    // - baseUrlStr = "0" is truthy, goes to if branch
    // - baseUrlStr = "0".replace(/^\/\//, 'http://') = "0" (no change)
    // - currentUrlStr = "//example.com".replace(/^\/\//, 'http://') = "http://example.com"
    // Wait, the first replace on currentUrlStr is BEFORE the if/else!
    const res = parse("//example.com", "0");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://example.com/");
  });
});