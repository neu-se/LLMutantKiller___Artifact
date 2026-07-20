import { gettype } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const linkUrl = 'http://example.com/path/index.html';
    const pageUrl = 'http://example.com/path/index.html';
    const expectedType = 'samelevel';
    const actualType = gettype(linkUrl, pageUrl);
    expect(actualType).toBe(expectedType);
  });
});