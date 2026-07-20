import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should return null when given a URL with an unsupported protocol like ftp", () => {
    // Test with a URL that has no protocol prefix and contains special chars
    // that would cause different insertion points between original and mutated regex
    const result = parse("xhttp://example.com");
    // Original: pos 0 check - 'xhttp://' doesn't start with \w+:// at pos 0? 
    // 'x' is \w, but 'xhttp:' then '//' - yes it matches \w+:\/\/! So lookahead fails at 0.
    // Then pos 1: 'http://' matches \w+:\/\/, fails. ... pos 5: '://' - lookahead succeeds
    // Mutated inserts http:// at pos 5 -> 'xhttphttp:////example.com' -> null
    // Original: pos 0 fails, no replacement -> 'xhttp://example.com' -> protocol 'xhttp:' -> null
    expect(result).toBeNull();
  });
});