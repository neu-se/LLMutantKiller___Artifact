import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should resolve relative URL with multi-char fragment correctly using base URL', () => {
    // currentUrlStr = 'foo#bar' with baseUrlStr = 'http://example.com/path/'
    // Original: 'foo#bar' -> strip fragment -> 'foo' -> resolve with base -> 'http://example.com/path/foo'
    // Mutated: 'foo#bar' -> /#.$/ doesn't match 'bar' (3 chars) -> stays 'foo#bar'
    //          -> resolve('http://example.com/path/', 'foo#bar') -> 'http://example.com/path/foo#bar'
    //          -> delete parsedUrl.hash -> 'http://example.com/path/foo'
    // These should be the same... but what about 'foo#ba' (2 chars)?
    // Mutated: /#.$/ doesn't match 'ba' (2 chars) -> same issue
    // What about baseUrl resolution with just fragment: '../page#xy'
    const result = parse('../page#xy', 'http://example.com/a/b/');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/a/page');
  });
});