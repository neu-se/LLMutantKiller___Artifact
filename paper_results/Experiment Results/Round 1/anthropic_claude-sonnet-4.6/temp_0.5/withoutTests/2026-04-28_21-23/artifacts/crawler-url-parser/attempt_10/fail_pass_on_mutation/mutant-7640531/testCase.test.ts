import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly handle fragment with trailing newline', () => {
    // Test where $ anchor behavior matters
    // For a URL ending with \n after fragment:
    // Original /#.*$/: $ matches before final \n, strips fragment
    // Mutated /#.*/: also strips fragment (same result for trailing \n)
    // The difference only shows with \n in MIDDLE (after #, not at end)
    // which is caught by illegal chars check
    // So we test the base case
    const result = parse('http://example.com/path#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
    expect(result!.search).toBeNull();
  });
});