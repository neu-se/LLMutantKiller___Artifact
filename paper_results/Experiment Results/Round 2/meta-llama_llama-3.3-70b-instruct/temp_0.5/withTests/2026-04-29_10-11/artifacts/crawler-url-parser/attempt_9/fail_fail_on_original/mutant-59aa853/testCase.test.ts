import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle duplicate links with different text', () => {
    const html = `
      <base href="http://example.com/aaa/bbb/ccc/">
      <a href="/ddd">Link 1</a>
      <a href="/ddd">Link 2</a>
    `;
    const result = extract(html);
    expect(result).not.toBeNull();
    if (result.length > 0) {
      const url = result.find(link => link.url === 'http://example.com/aaa/bbb/ccc/ddd');
      expect(url).not.toBeNull();
      expect(url.text.split(' ').length).toBeGreaterThan(2); // This will pass on the original code and fail on the mutated code
    }
  });
});