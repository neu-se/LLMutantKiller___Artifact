import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should return an object with null baseurl when parsing an absolute URL without a base URL', () => {
    const result = parse('http://example.com/path');
    expect(result).not.toBeNull();
    // In original code, baseurl is explicitly initialized to null
    // In mutated code, baseurl is never set for absolute URLs, so it would be undefined
    expect(result.baseurl).toBeNull();
  });
});