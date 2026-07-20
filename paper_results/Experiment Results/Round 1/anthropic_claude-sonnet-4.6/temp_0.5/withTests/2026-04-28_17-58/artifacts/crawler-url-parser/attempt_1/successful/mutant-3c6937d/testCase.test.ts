import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should include hrefs with exactly 3 characters', () => {
  it('should include a link with an href of exactly 3 characters', () => {
    const html = '<html><body><a href="/ab">link</a></body></html>';
    const result = extract(html, 'http://www.example.com/');
    const urls = result.map((r: any) => r.url);
    expect(urls.some((url: string) => url.includes('/ab'))).toBe(true);
  });
});