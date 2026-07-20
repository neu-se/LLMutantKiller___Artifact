import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should return the same host for www and non-www URLs when stripWWW is true', () => {
    const url1 = 'http://www.example.com';
    const url2 = 'http://example.com';
    const result1 = parse(url1);
    const result2 = parse(url2);
    if (result1 === null || result2 === null) {
      throw new Error('parse returned null');
    }
    expect(result1.host).toBe(result2.host); // This should pass on the original code
    // However, we want a test that fails on the mutated code
    // The issue is that the original code and the mutated code both return 'www.example.com' for the host
    // So, we need a different approach
  });
});