import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype default.html normalization trailing slash', () => {
  it('should return internal when link has /aaa/default.html and page has /aaaxxx/bbb (not a true uplevel)', () => {
    const result = gettype(
      'http://www.example.com/aaa/default.html',
      'http://www.example.com/aaaxxx/bbb'
    );
    expect(result).toBe('internal');
  });
});