import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly handle URLs that fail parsing", () => {
    const html = `
      <html>
        <head><base href="http://example.com/"></head>
        <body>
          <a href="invalid://url">Invalid Protocol</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://example.com/");
    expect(result).toEqual([]);
  });
});