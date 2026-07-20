import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs with fragments correctly', () => {
    const url = 'https://www.example.com/path#fragm';
    const baseUrl = 'https://www.example.com/base#anchor';

    const resultOriginal = parse(url, baseUrl);
    expect(resultOriginal.url).toBe('https://www.example.com/path');

    // The mutated code will not remove the full fragment, so the URL will be incorrect
    // This test should pass on the original code and fail on the mutated code
    expect(resultOriginal.url).not.toBe('https://www.example.com/path#fragm');
  });
});