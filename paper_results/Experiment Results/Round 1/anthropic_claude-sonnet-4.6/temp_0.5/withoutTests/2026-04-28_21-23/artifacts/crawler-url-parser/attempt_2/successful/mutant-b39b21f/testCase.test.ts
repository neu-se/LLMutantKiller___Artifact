import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should return baseurl as null (not undefined) when no base URL resolution occurs', () => {
    const result = parse('http://example.com/path');
    expect(result).not.toBeNull();
    // In original code, ret.baseurl is initialized to null and never changed for absolute URLs
    // In mutated code, ret.baseurl would be undefined since ret starts as {}
    expect(result.baseurl).toBeNull();
  });
});