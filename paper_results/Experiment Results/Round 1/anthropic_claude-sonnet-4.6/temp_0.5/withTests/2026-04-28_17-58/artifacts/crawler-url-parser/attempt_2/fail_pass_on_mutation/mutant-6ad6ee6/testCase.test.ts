import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with two-character fragment', () => {
  it('should completely strip a two-character fragment from a URL leaving no residual characters', () => {
    // Original: /#.*$/ removes "#ab" entirely -> "http://www.example.com/page"
    // Mutated:  /#.$/ matches "#a" and removes it, leaving "b" -> "http://www.example.com/pageb"
    const result = parse("http://www.example.com/page#ab");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/page");
  });
});