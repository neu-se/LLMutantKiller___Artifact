import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return different host lengths for www and non-www URLs', () => {
    const url1 = 'http://example.com';
    const url2 = 'http://www.example.com';
    const result1 = parse(url1);
    const result2 = parse(url2);
    if (result1 === null || result2 === null) {
      throw new Error('parse returned null');
    }
    expect(result1.host.length).not.toBe(result2.host.length); // This should pass on the mutated code
  });
});