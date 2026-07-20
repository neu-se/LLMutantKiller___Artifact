import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should correctly process string HTML input", () => {
    const html = `
      <html>
        <head>
          <base href="https://example.com/base/">
        </head>
        <body>
          <a href="/test">Test Link</a>
        </body>
      </html>
    `;

    const result = extract(html, "https://example.com");
    expect(result).toEqual([{
      url: "https://example.com/test",
      text: "Test Link",
      type: "sublevel"
    }]);
  });
});