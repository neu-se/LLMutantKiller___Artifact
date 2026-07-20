import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should strip bare fragment (just #) from URL', () => {
    // Original: /#.*$/ matches '#' with zero chars after it, strips it
    // Mutated: /#.$/ requires exactly one char after #, so bare '#' is NOT matched
    // With bare '#', original strips it cleanly; mutated leaves '#' which affects URL formatting
    const result = parse('http://example.com/page#');
    expect(result).not.toBeNull();
    // The URL should not contain '#'
    expect(result!.url).not.toContain('#');
    expect(result!.url).toBe('http://example.com/page');
  });
});