import { gettype } from './crawler-url-parser.js';

describe('gettype function', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = 'http://example.com/default.html';
    const pageurl = 'http://example.com/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});