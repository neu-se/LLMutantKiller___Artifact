import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should return non-null for URL starting with dots before ://', () => {
    const result = parse('...://example.com');
    expect(result).not.toBeNull();
  });
});