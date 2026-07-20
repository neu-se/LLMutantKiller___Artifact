import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function text property', () => {
  it('should preserve the actual link text when extracting URLs', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/page1">Hello World</a>
        </body>
      </html>
    `;
    
    const result = extract(html, "http://www.example.com/");
    
    const page1 = result.find((el: any) => el.url === "http://www.example.com/page1");
    expect(page1).toBeDefined();
    expect(page1!.text).toBe("Hello World");
  });
});