import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype', () => {
  it('should correctly identify external links', () => {
    const result = gettype('//example.com/path', 'http://other.com/');
    expect(result).toBe('external');
  });
});