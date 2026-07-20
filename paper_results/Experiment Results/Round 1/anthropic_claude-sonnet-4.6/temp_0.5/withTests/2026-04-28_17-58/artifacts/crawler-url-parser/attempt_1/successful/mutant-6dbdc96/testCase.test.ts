import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out short hrefs with length less than 3', () => {
  it('should not include links with href shorter than 3 characters', () => {
    const html = `<html><body>
      <a href="ab">short link</a>
      <a href="http://www.example.com/valid">valid link</a>
    </body></html>`;

    const result = extract(html, "http://www.example.com/page");

    // The short href "ab" (length 2) should be filtered out
    // Only the valid link should be present
    const urls = result.map((el: any) => el.url);
    const hasShortHref = urls.some((url: string) => url.includes('ab') && !url.includes('example.com'));
    expect(hasShortHref).toBe(false);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.example.com/valid');
  });
});