import { gettype } from '../../crawler-url-parser.js';

describe('gettype function', () => {
  it('should return the correct type for a link and a page', () => {
    const linkurl = 'https://www.example.com/aaa/bbb';
    const pageurl = 'https://www.example.com/aaa/bbb';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});