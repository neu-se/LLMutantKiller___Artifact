import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should filter out anchors with undefined href', () => {
  it('should not include links with undefined href in extracted results', () => {
    // An anchor without an href attribute will have href === undefined
    // Original code: if (typeof href == "undefined" || ...) return;  -> skips undefined hrefs
    // Mutated code: if (false || ...) return;  -> does NOT skip undefined hrefs, causing crash or wrong behavior
    const html = `
      <html>
        <body>
          <a>no href at all</a>
          <a href="http://www.example.com/valid-link">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://www.example.com/");
    // With original code: the anchor without href is skipped (undefined check passes),
    // only the valid link is included (but it equals baseUrl so it gets deleted), result is empty or just valid links
    // With mutated code: href is undefined, then href.length throws a TypeError
    // So the original should return an array without throwing, mutated should throw
    expect(Array.isArray(result)).toBe(true);
    // The valid link equals the base URL so it gets removed, result should be empty
    expect(result.length).toBe(0);
  });
});