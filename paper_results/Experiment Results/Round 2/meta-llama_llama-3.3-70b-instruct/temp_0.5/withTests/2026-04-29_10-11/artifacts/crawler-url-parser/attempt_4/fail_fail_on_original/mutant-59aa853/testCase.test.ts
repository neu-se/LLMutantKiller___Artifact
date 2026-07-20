import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle duplicate links with different text', () => {
    const html = `
      <a href="http://example.com">Link 1</a>
      <a href="http://example.com">Link 2</a>
    `;
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    expect(result).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);
    const url = result.find(link => link.url === 'http://example.com');
    expect(url).not.toBeNull();
    expect(url.text).toContain('Link 1');
    expect(url.text).toContain('Link 2');
  });
});