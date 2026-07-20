import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with https base URL', () => {
  it('should preserve https protocol in extracted URLs when source is https', () => {
    const html = '<html><body><a href="https://example.com/page1">link1</a><a href="/page2">link2</a></body></html>';
    const result = extract(html, "https://example.com/home");
    const page1 = result.find((u: any) => u.url.includes('page1'));
    expect(page1).toBeDefined();
    expect(page1.url.startsWith('https://')).toBe(true);
  });
});