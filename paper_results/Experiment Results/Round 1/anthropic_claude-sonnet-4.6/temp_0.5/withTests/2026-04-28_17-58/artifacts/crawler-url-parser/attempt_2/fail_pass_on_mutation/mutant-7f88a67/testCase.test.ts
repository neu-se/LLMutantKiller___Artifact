import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract preserves https protocol when normalizeHttps is false', () => {
  it('should preserve https:// in extracted URLs when normalizeHttps is false', () => {
    const html = '<html><body><a href="https://www.example.com/page">link</a></body></html>';
    const result = extract(html, "https://www.example.com/");
    const httpsUrls = result.filter((el: any) => el.url && el.url.startsWith('https://'));
    expect(httpsUrls.length).toBeGreaterThan(0);
  });
});