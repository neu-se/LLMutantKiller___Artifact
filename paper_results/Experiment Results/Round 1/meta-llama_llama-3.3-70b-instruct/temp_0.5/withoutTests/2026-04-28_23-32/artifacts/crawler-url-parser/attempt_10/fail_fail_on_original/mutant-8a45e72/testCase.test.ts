import { gettype } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = 'http://example.com/default.123';
    const pageurl = 'http://example.com/';
    const resultOriginal = gettype(linkurl, pageurl);
    expect(resultOriginal).not.toBe('samelevel');
  });
});