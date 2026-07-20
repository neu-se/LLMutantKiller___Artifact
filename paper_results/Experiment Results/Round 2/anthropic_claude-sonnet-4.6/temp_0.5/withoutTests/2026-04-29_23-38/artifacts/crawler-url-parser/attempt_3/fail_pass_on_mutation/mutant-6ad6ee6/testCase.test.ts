import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function - fragment removal', () => {
  it('should strip fragment with two or more characters leaving no residual characters in path', () => {
    // Original /#.*$/ removes "#xy" entirely from "http://example.com/path#xy"
    // Mutated /#.$/ removes only "#x" leaving "y", making path "/pathy" instead of "/path"
    const result = parse('http://example.com/path#xy');
    
    expect(result).not.toBeNull();
    expect(result!.path).toBe('/path');
    expect(result!.url).not.toContain('y');
  });
});