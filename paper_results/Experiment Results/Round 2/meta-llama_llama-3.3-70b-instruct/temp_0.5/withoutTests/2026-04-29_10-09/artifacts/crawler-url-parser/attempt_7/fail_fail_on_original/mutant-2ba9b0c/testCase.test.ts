import { gettype } from '../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should return "internal" when linkurl and pageurl have the same host', () => {
    const linkurl = 'http://example.com/aaa/bbb/ccc';
    const pageurl = 'http://example.com/aaa/bbb/ddd';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('internal');
  });
});