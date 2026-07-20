import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("extract function", () => {
  it("should filter out invalid URLs with illegal characters", () => {
    const html = `
      <html>
        <head><base href="http://example.com/base"></head>
        <body>
          <a href="http://example.com/valid">Valid Link</a>
          <a href="http://example.com/invalid<script>">Invalid Link</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://example.com";
    const result = extract(html, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com/valid");
    expect(result[0].text).toBe("Valid Link");
  });
});