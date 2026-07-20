import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text aggregation for duplicate URLs', () => {
  it('should concatenate text from multiple anchor tags pointing to the same URL', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">First Link Text</a>
          <a href="http://www.example.com/page">Second Link Text</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://www.example.com/");

    // There should be exactly one entry for the duplicate URL
    const pageLinks = result.filter((el: any) => el.url === "http://www.example.com/page");
    expect(pageLinks.length).toBe(1);

    // The text should contain both link texts concatenated
    expect(pageLinks[0].text).toContain("First Link Text");
    expect(pageLinks[0].text).toContain("Second Link Text");
  });
});