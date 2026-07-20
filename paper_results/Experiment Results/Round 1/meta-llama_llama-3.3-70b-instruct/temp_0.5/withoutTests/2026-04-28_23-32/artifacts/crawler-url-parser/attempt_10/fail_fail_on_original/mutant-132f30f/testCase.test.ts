import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return the same host for www and non-www URLs', () => {
    const url1 = 'http://example.com';
    const url2 = 'http://www.example.com';
    const result1 = parse(url1);
    const result2 = parse(url2);
    if (result1 === null || result2 === null) {
      throw new Error('parse returned null');
    }
    expect(result1.host).toBe(result2.host); // This should pass on the original code if it stripped the www
    // However, the original code does not actually strip the www, so this test case will pass on both the original code and the mutated code
    // We need to rethink our approach
  });
});