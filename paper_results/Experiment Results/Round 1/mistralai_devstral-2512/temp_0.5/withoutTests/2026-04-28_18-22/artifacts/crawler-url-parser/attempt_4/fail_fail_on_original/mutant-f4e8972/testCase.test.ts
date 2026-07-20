import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should handle string data input with base URL correctly", () => {
    const htmlData = `
      <html>
        <head>
          <base href="https://base.example.com/">
        </head>
        <body>
          <a href="/relative/path">Link</a>
        </body>
      </html>
    `;

    const result = extract(htmlData, "https://original.example.com/");
    expect(result).toEqual([
      {
        url: "https://base.example.com/relative/path",
        text: "Link",
        type: "external"
      }
    ]);
  });
});