import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function with removeDirectoryIndex option", () => {
  it("should normalize URLs with index files when processing HTML", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base/"></head>
        <body>
          <a href="subdir/index.html">Link</a>
        </body>
      </html>
    `;
    const result = extract(html, "http://example.com/base/");
    expect(result[0].url).toBe("http://example.com/base/subdir/");
  });
});