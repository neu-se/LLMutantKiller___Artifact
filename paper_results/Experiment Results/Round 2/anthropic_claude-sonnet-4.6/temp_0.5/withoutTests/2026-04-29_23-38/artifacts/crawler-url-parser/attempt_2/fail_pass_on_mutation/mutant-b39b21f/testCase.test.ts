import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should return an object with null subdomain when URL has no subdomain', () => {
    const result = parse('http://example.com/path');
    expect(result).not.toBeNull();
    // In original code, subdomain is explicitly initialized to null
    // In mutated code, if psl.parse returns no subdomain, it would be undefined
    expect(result.subdomain).toBeNull();
  });
});