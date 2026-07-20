import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should not throw when an anchor element has no href attribute", () => {
    const html = `
      <html>
        <body>
          <a>No href anchor</a>
          <a href="http://example.com/page">Valid link</a>
        </body>
      </html>
    `;
    
    // Original code: typeof href == "undefined" short-circuits with ||, so href.length is never accessed
    // Mutated code: uses &&, so if href is undefined, href.length throws TypeError
    expect(() => {
      extract(html, "http://example.com");
    }).not.toThrow();
  });
});