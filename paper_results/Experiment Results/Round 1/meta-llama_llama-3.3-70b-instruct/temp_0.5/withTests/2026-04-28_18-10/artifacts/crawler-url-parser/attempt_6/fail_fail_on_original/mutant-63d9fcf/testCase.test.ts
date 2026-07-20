import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should not append duplicate text to existing url', () => {
    const html = `
      <a href="http://example.com">Link 1</a>
      <a href="http://example.com">Link 1</a>
    `;
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Link 1');
  });
});