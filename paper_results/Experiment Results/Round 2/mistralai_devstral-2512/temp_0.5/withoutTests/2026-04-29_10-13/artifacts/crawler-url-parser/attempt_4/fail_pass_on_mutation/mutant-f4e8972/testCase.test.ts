import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should process string HTML input correctly", () => {
    const html = `
      <html>
        <body>
          <a href="/test">Test Link</a>
        </body>
      </html>
    `;

    const result = extract(html, "https://example.com");
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].url).toBe("https://example.com/test");
    expect(result[0].text).toBe("Test Link");
  });
});