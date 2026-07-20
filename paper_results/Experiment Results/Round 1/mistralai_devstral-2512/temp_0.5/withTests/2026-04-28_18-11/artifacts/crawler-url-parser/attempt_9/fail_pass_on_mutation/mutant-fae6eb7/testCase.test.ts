import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with baseUrl containing hash', () => {
  it('should correctly handle baseUrl with hash followed by content', () => {
    const result = parse("test", "http://example.com#section1");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/test");
  });
});