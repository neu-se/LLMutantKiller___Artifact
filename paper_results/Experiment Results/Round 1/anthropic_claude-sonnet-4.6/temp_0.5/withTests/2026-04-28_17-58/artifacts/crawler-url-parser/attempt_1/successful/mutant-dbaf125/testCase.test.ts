import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract deduplicates link text for duplicate URLs', () => {
  it('should not duplicate link text when the same URL appears multiple times with the same anchor text', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">Click Here</a>
          <a href="http://www.example.com/page">Click Here</a>
          <a href="http://www.example.com/page">Click Here</a>
        </body>
      </html>
    `;

    const result = extract(html, 'http://www.example.com/');
    const page = result.find((el: any) => el.url === 'http://www.example.com/page');

    expect(page).toBeDefined();
    // In the original code, since "Click Here" is already included in the text,
    // it won't be appended again. So the text should be "Click Here" (not duplicated).
    // In the mutated code (if true), it always appends, resulting in "Click Here Click Here Click Here".
    expect(page!.text).toBe('Click Here');
  });
});