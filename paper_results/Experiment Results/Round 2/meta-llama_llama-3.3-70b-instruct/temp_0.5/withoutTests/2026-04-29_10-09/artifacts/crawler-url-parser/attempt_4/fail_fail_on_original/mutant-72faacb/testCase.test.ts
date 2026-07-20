import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle href with type string but empty correctly', () => {
    const data = '<a href="">Test</a>';
    const sourceUrl = 'http://example.com';
    const resultOriginal = extract(data, sourceUrl);
    expect(resultOriginal.length).toBe(0);
    // Check the behavior of the mutated code
    const href = "";
    if (typeof href == "" || href.length < 3 || /^(javascript|mailto:|ftp:)/ig.test(href)) {
      throw new Error("Mutated code should not pass this test");
    }
  });
});