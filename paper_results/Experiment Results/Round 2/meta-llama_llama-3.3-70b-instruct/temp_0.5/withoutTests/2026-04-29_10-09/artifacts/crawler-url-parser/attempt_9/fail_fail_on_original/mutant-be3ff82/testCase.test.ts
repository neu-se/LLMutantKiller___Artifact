const crawlerUrlParser = require('./crawler-url-parser');

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const linkUrl = 'http://example.com/path/index.html';
    const pageUrl = 'http://example.com/path/index.123';
    const expectedType = 'samelevel';
    const actualType = crawlerUrlParser.gettype(linkUrl, pageUrl);
    expect(actualType).toBe(expectedType);
  });
});