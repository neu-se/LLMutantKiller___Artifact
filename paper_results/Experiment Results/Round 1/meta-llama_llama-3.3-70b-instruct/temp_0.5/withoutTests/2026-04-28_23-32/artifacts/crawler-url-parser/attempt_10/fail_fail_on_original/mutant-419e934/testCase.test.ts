import { gettype } from './crawler-url-parser';

describe('gettype function', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path', () => {
    const linkurl = 'http://example.com/path/to/default.html';
    const pageurl = 'http://example.com/path/to/index.html';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});