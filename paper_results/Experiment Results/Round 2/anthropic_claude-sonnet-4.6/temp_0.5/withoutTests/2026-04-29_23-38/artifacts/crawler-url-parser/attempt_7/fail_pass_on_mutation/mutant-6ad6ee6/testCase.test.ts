import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should strip fragment completely so path is not contaminated by leftover fragment characters', () => {
    const result = parse('http://example.com/path#ab');
    expect(result).not.toBeNull();
    // Original: removes "#ab" entirely, path = "/path"
    // Mutant: removes "#a" only, leaving "b" appended, path = "/pathb"
    expect(result!.path).toBe('/path');
  });
});