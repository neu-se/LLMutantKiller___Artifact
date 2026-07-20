import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function - duplicate URL text aggregation', () => {
  it('should aggregate text from multiple anchor tags pointing to the same URL', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">First Link Text</a>
          <a href="http://www.example.com/page">Second Link Text</a>
        </body>
      </html>
    `;
    const sourceUrl = "http://www.example.com/";
    const result = extract(html, sourceUrl);

    // There should be exactly one entry for the duplicate URL
    const pageLinks = result.filter((el: any) => el.url === "http://www.example.com/page");
    expect(pageLinks.length).toBe(1);

    // The text should contain both link texts aggregated together
    const pageLink = pageLinks[0];
    expect(pageLink.text).toContain("First Link Text");
    expect(pageLink.text).toContain("Second Link Text");
  });
});