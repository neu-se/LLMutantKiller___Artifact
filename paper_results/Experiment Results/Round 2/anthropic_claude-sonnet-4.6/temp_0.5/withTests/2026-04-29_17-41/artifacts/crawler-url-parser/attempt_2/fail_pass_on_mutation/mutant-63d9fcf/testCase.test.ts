import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text assignment', () => {
  it('should assign link text to extracted URL when URL is first encountered', () => {
    const html = `<html><body>
      <a href="http://www.example.com/some-page">Hello World</a>
    </body></html>`;

    const result = extract(html, "http://www.example.com/");
    const found = result.find((el: any) => el.url && el.url.includes('some-page'));
    expect(found).toBeDefined();
    expect(found.text).toBe('Hello World');
  });
});