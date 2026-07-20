import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('extract with https links', () => {
  it('should preserve https in extracted link urls', () => {
    const html = '<html><body><a href="https://other.com/page">Link</a></body></html>';
    const sourceUrl = 'http://source.com/';
    const results = extract(html, sourceUrl);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].url).toMatch(/^https:/);
  });
});