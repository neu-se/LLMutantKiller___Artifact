import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract text for duplicate URLs with different link texts', () => {
  it('should concatenate different link texts when the same URL appears multiple times', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page">First Text</a>
          <a href="http://www.example.com/page">Second Text</a>
        </body>
      </html>
    `;
    const result = extract(html, 'http://www.example.com/');
    const pageEntry = result.find((el: any) => el.url === 'http://www.example.com/page');
    expect(pageEntry).toBeDefined();
    expect(pageEntry!.text).toBe('First Text Second Text');
  });
});