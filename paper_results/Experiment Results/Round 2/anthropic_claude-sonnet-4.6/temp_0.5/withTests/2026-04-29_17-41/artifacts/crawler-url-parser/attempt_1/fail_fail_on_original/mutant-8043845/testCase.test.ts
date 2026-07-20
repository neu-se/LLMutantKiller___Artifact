import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out javascript: links', () => {
  it('should not include javascript: href links in extracted results', () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">click me</a>
          <a href="http://www.example.com/valid-link">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://www.example.com/");
    const urls = result.map((r: { url: string }) => r.url);
    const hasJavascriptLink = urls.some((url: string) => url.includes('javascript'));
    expect(hasJavascriptLink).toBe(false);
    expect(result.length).toBe(0);
  });
});