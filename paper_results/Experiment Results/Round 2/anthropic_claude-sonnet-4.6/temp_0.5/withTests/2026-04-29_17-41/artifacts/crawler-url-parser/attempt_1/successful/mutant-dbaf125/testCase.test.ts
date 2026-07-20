import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function - duplicate link text accumulation', () => {
  it('should not duplicate text when the same text appears multiple times for the same URL', () => {
    // When the same URL appears multiple times with the same link text,
    // the original code checks `!tmpUrl.text.includes(text)` before appending.
    // The mutated code always appends (condition is always `true`),
    // causing duplicate text accumulation.
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">Click Here</a>
          <a href="http://www.example.com/page">Click Here</a>
          <a href="http://www.example.com/page">Click Here</a>
        </body>
      </html>
    `;

    const result = extract(html, "http://www.example.com/");
    const pageEntry = result.find((el: any) => el.url === "http://www.example.com/page");

    expect(pageEntry).toBeDefined();
    // In the original code, since "Click Here" is already in the text,
    // it won't be appended again. The text should just be "Click Here".
    // In the mutated code, it always appends, resulting in "Click Here Click Here Click Here".
    expect(pageEntry!.text).toBe("Click Here");
  });
});