import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should return correct type for links with default page', () => {
    const linkurl = 'http://example.com/path/default.html';
    const pageurl = 'http://example.com/path/default.htm';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('internal');
  });
});