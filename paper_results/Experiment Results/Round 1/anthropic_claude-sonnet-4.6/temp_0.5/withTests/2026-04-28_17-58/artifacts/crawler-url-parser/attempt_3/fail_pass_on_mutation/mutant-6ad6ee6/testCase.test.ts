import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL fragment stripping', () => {
  it('should strip a two-character fragment completely from a URL', () => {
    // Original: /#.*$/ removes "#ab" entirely -> url has no fragment
    // Mutated:  /#.$/ does NOT match "#ab" (needs exactly one char after #) -> fragment remains
    const result = parse("http://www.example.com/page#ab");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/page");
  });
});