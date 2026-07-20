import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out short href values', () => {
  it('should not include links with href shorter than 3 characters', () => {
    const html = `<html><body>
      <a href="ab">short link</a>
      <a href="http://www.example.com/valid">valid link</a>
    </body></html>`;

    const result = extract(html, "http://www.example.com/");

    const urls = result.map((el: any) => el.url);
    const hasShortHref = urls.some((url: string) => url === "ab" || url === "http://www.example.com/ab");
    expect(hasShortHref).toBe(false);
    expect(result.length).toBe(1);
  });
});