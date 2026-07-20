import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with multi-character fragment', () => {
  it('should strip a fragment with multiple characters from a URL', () => {
    // Original: /#.*$/ removes "#section123" entirely
    // Mutated:  /#.$/ only removes "#" + exactly one char, so "#section123" is NOT removed
    const result = parse("http://www.example.com/page#section123");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/page");
  });
});