import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle duplicate links with different text', () => {
    const data = `
      <a href="https://www.example.com">Link 1</a>
      <a href="https://www.example.com">Link 1</a>
    `;
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.example.com');
    expect(result[0].text).toBe('Link 1');
  });
});