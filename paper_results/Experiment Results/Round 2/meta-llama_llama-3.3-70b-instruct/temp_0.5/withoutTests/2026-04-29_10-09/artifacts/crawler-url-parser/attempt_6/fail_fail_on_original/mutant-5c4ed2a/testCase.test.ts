import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs with fragments correctly', () => {
    const url = 'https://www.example.com/path';
    const baseUrl = 'https://www.example.com/base#fragment123';

    const result = parse(url, baseUrl);
    if (result !== null) {
      expect(result.baseurl).toBe('https://www.example.com/base');
    } else {
      expect(result).not.toBeNull();
    }
  });
});