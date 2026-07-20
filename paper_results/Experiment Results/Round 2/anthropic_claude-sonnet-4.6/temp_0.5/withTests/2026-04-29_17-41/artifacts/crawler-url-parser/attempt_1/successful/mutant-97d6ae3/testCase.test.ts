import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with invalid protocol href that causes parse to return null', () => {
  it('should not throw when an anchor href results in a null parse result', () => {
    const html = `
      <html>
        <body>
          <a href="htp://www.example.com/some/path">invalid protocol link</a>
          <a href="http://www.example.com/valid">valid link</a>
        </body>
      </html>
    `;

    expect(() => {
      const result = extract(html, 'http://www.example.com/');
      expect(Array.isArray(result)).toBe(true);
    }).not.toThrow();
  });
});