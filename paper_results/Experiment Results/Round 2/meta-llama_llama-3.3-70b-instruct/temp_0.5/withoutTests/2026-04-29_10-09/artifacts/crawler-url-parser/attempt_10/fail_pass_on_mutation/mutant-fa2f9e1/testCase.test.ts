import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle text when it is null', () => {
    const data = '<a href="https://www.example.com"></a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result).toBeDefined();
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('text');
      expect(result[0].text).toBe('');
    }
    const dataWithNullText = '<a href="https://www.example.com">null</a>';
    const resultWithNullText = extract(dataWithNullText, sourceUrl);
    expect(resultWithNullText).toBeDefined();
    if (resultWithNullText.length > 0) {
      expect(resultWithNullText[0]).toHaveProperty('text');
      expect(resultWithNullText[0].text).not.toBe('');
    }
  });
});