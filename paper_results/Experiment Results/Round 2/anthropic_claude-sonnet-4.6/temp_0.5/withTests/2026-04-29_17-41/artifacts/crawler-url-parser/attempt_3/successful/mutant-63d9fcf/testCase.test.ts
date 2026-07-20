import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function duplicate URL text accumulation', () => {
  it('should accumulate text from multiple links pointing to the same URL', () => {
    const html = `<html><body>
      <a href="http://www.example.com/page">First Text</a>
      <a href="http://www.example.com/page">Second Text</a>
    </body></html>`;

    const result = extract(html, "http://www.example.com/");
    const found = result.find((el: any) => el.url && el.url.includes('/page'));
    expect(found).toBeDefined();
    // Original code accumulates text from both links
    // Mutated code does not accumulate (condition is inverted)
    expect(found.text).toContain('First Text');
    expect(found.text).toContain('Second Text');
  });
});