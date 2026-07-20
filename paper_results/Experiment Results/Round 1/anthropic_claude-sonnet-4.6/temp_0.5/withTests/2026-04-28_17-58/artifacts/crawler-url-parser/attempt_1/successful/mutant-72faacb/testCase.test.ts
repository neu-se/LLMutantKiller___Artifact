import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with anchor tags missing href attribute', () => {
  it('should not throw and should skip anchor tags without href attributes', () => {
    const html = `<html><body>
      <a>no href anchor</a>
      <a href="http://www.example.com/page">valid link</a>
    </body></html>`;

    expect(() => {
      const result = extract(html, "http://www.example.com/");
      expect(result.length).toBe(1);
      expect(result[0].url).toBe("http://www.example.com/page");
    }).not.toThrow();
  });
});