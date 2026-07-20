import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should not modify the text of the extracted URLs', () => {
    const data = '<a href="https://www.example.com">null</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    if (result.length > 0) {
      expect(result[0].text).toBe('null');
    }
  });
});