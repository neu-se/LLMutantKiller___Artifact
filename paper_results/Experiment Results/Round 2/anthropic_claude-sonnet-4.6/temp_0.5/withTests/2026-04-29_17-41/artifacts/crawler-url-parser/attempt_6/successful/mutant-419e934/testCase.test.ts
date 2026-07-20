import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with index.html normalization', () => {
  it('should return internal not sublevel when paths share prefix but are not parent-child', () => {
    const result = gettype(
      'http://www.stackoverflow.com/aaax/ccc',
      'http://www.stackoverflow.com/aaa/index.html'
    );
    expect(result).toBe('internal');
  });
});