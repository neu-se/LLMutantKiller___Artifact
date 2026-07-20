import { parse } from '../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('parse function', () => {
  it('should correctly parse URL with fragment', () => {
    const url = 'http://example.com/path?a=1#fragment';
    const expectedUrl = 'http://example.com/path?a=1';
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);
  });

  it('should incorrectly parse URL with fragment when using mutated code', () => {
    // Simulate the mutated code by replacing the original parse function
    const originalParse = parse;
    parse = (url: string) => {
      const parsedUrl = new URL(url);
      parsedUrl.hash = ''; // Mutated code: only remove the first character of the fragment
      return {
        url: parsedUrl.href,
        // ... other properties
      };
    };

    const url = 'http://example.com/path?a=1#fragment';
    const expectedUrl = 'http://example.com/path?a=1#ragment'; // Note the incorrect parsing
    const result = parse(url);
    expect(result.url).toBe(expectedUrl);

    // Restore the original parse function
    parse = originalParse;
  });
});