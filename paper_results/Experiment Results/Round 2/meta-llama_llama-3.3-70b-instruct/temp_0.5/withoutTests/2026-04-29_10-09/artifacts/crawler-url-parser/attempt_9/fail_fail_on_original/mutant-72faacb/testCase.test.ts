import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle href with null type correctly', () => {
    const data = '<a href=null>Test</a>';
    const sourceUrl = 'http://example.com';
    const resultOriginal = extract(data, sourceUrl);
    expect(resultOriginal.length).toBe(0);
    // Check the behavior of the mutated code
    const dataMutated = '<a href=null>Test</a>';
    const resultMutated = extract(dataMutated, sourceUrl);
    expect(resultMutated.length).not.toBe(0);
  });
});