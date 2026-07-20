import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out anchors with undefined href', () => {
  it('should not throw and should return an array when an anchor has no href attribute', () => {
    // An anchor without an href attribute will have href === undefined
    // Original code: if (typeof href == "undefined" || ...) return;  -> skips undefined hrefs safely
    // Mutated code: if (false || ...) return;  -> does NOT skip undefined hrefs,
    //   so href.length is called on undefined, throwing a TypeError
    const html = `
      <html>
        <body>
          <a>no href at all</a>
          <a href="http://www.google.com/some-page">valid link</a>
        </body>
      </html>
    `;
    // On original code: runs without error, returns array with the valid link
    // On mutated code: throws TypeError because undefined.length is accessed
    let result: any;
    expect(() => {
      result = extract(html, "http://www.example.com/");
    }).not.toThrow();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe("http://www.google.com/some-page");
  });
});