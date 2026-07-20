import { gettype } from "./crawler-url-parser";

describe('gettype function', () => {
  it('should return the correct type for a given link and page url', () => {
    const linkurl = 'http://example.com/path/to/index.html';
    const pageurl = 'http://example.com/path/to';
    const expectedType = 'sublevel';
    const actualType = gettype(linkurl, pageurl);
    expect(actualType).toBe(expectedType);
  });
});