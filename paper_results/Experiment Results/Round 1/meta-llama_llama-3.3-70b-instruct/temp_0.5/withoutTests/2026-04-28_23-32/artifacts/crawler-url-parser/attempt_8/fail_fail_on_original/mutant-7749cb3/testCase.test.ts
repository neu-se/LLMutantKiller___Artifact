import { gettype } from '../../../crawler-url-parser.js';

describe('gettype function', () => {
  it('should correctly handle the replacement of default.[a-z]+$ in pageurl_path', () => {
    const linkurl = 'http://example.com/path/to/default.html';
    const pageurl = 'http://example.com/path/to/default';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });
});