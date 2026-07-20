import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with default.htm in pageurl', () => {
  it('should return internal not sublevel when linkurl path starts with pageurl path prefix but not as directory', () => {
    const result = gettype("http://example.com/aaa-extra/ccc", "http://example.com/aaa/default.htm");
    expect(result).toBe("internal");
  });
});