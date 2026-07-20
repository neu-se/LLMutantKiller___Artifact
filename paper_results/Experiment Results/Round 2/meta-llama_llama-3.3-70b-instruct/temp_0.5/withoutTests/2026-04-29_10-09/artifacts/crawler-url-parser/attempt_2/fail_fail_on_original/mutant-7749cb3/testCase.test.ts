import { gettype } from '../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return the correct type for a link', () => {
    const linkurl = 'http://example.com/aaa/bbb/default.html';
    const pageurl = 'http://example.com/aaa/bbb/';
    const resultOriginal = gettype(linkurl, pageurl);
    expect(resultOriginal).toBe('samelevel');
  });
});