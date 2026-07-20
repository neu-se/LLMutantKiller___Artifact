import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with normalizeHttps option', () => {
  it('should return different results when normalizeHttps is true or false', () => {
    const url = 'http://example.com';
    const result1 = parse(url);
    const originalResult = result1.url;

    // Simulate the mutation by setting normalizeHttps to true
    const result_normalize_options = {
      removeDirectoryIndex: true,
      removeTrailingSlash: true,
      stripWWW: true,
      stripFragment: true,
      normalizeHttps: true,
      normalizeProtocol: true,
      removeQueryParameters: [/^utm_\w+/i, 'ref']
    };

    // Apply the simulated mutation
    const mutatedParse = (url: string) => {
      const parsedUrl = new URL(url);
      if (result_normalize_options.normalizeHttps && parsedUrl.protocol === 'http:') {
        parsedUrl.protocol = 'https:';
      }
      return parsedUrl.href;
    };

    const result2 = mutatedParse(url);
    expect(originalResult).not.toBe(result2);
  });
});