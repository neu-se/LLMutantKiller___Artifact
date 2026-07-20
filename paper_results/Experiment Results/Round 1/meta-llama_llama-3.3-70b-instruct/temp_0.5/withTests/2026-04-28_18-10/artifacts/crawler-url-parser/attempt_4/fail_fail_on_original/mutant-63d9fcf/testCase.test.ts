import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should not append text to existing url when it already exists', () => {
    const html = `
      <a href="http://example.com">Link 1</a>
      <a href="http://example.com">Link 1</a>
    `;
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result[0].text).not.toBe('Link 1 Link 1');
  });
});