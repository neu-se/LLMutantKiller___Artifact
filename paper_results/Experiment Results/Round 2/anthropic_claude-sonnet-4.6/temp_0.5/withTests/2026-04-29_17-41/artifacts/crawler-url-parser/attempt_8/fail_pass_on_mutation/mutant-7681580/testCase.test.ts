import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse ab:// URL', () => {
  it('should return null for ab:// URL since ab is not a valid protocol', () => {
    const result = parse("ab://example.com");
    expect(result).toBeNull();
  });
});