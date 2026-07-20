import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text trimming', () => {
  it('should trim whitespace from link text when extracting URLs', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page1">  Hello World  </a>
          <a href="http://www.example.com/page2">
            Some Text
          </a>
        </body>
      </html>
    `;

    const result = extract(html, 'http://www.example.com/');

    const page1 = result.find((item: any) => item.url === 'http://www.example.com/page1');
    const page2 = result.find((item: any) => item.url === 'http://www.example.com/page2');

    expect(page1).toBeDefined();
    expect(page1!.text).toBe('Hello World');

    expect(page2).toBeDefined();
    expect(page2!.text).toBe('Some Text');
  });
});