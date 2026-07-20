import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should not carry over base URL query params when resolving relative path with base having query', () => {
    const result1 = parse('page', 'http://example.com/?a=1');
    const result2 = parse('/page', 'http://example.com/?a=1');
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
    // The resolved URL should not contain the base's query params
    expect(result1!.url).toBe('http://example.com/page');
    expect(result2!.url).toBe('http://example.com/page');
  });
});