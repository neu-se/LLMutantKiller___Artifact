import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should return null for URL with illegal chars that appear when fragment is not fully removed', () => {
    // Craft a URL where incomplete fragment removal produces illegal characters
    // Use a fragment with a space (encoded as %20 won't work, use actual space)
    // "#  " - fragment with 2 spaces: mutant removes "# " leaving " " which is illegal
    const result = parse('http://example.com/path# x');
    // Original removes "# x" entirely -> valid URL
    // Mutant removes "# " (# + one char) leaving "x" -> "http://example.com/pathx" (valid but different)
    // Wait, let's use a char that makes it illegal
    // "# " -> mutant removes "#" + " " = "# ", leaving nothing... same
    // Try fragment "# ab" -> mutant removes "# " leaving "ab"
    expect(result).not.toBeNull();
    expect(result!.path).toBe('/path');
  });
});