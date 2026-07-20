import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract function HTTPS protocol handling', () => {
  it('should preserve https protocol in extracted URLs when normalizeHttps is false', () => {
    const html = '<a href="https://www.example.com/page">Link</a>';
    const results = extract(html, 'https://www.example.com/');
    const externalLink = results.find(r => r.url.includes('example.com/page'));
    expect(externalLink).toBeDefined();
    expect(externalLink!.url).toMatch(/^https:/);
  });
});