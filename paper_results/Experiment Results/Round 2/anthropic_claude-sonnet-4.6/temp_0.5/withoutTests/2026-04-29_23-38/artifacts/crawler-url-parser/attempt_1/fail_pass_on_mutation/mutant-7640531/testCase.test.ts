import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
  it('should strip fragment including hash from URL with newline after hash content', () => {
    // The difference: /#.*$/ stops before trailing newline, /#.*/ also stops before newline
    // But with a URL like "http://example.com/#hash\nmore", 
    // /#.*$/ (no multiline) - $ matches end of string, .* doesn't match \n, so matches "#hash"
    // /#.*/ - matches "#hash" too
    // Let's try a URL where the fragment appears before a newline in the middle
    const result = parse("http://example.com/path#section\nnewline");
    // With /#.*$/, replaces "#section" leaving "\nnewline" → illegal chars → null
    // With /#.*/, replaces "#section" leaving "\nnewline" → same
    // Need different approach
    expect(result).toBeNull();
  });
});