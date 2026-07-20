import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function href filtering', () => {
  it('should not include links with undefined href or href shorter than 3 characters', () => {
    // The original code filters out hrefs that are undefined, have length < 3, or match javascript/mailto/ftp
    // The mutated code removes the undefined check and length < 3 check (replaces with `false`)
    // An anchor with href="ab" (length 2, < 3) should be excluded in original but included in mutated
    const html = `
      <html>
        <body>
          <a href="ab">short link</a>
          <a href="http://www.example.com/valid-link">valid link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://www.example.com/");
    // In original: "ab" has length 2 < 3, so it's filtered out
    // In mutated: "ab" passes the false check, gets processed (may or may not produce a valid URL)
    // The valid link should always be present
    const urls = result.map((r: any) => r.url);
    // "ab" relative to "http://www.example.com/" would resolve to "http://www.example.com/ab"
    // In original code, this is filtered out due to href.length < 3
    // In mutated code, this would be included
    expect(urls).not.toContain("http://www.example.com/ab");
  });
});