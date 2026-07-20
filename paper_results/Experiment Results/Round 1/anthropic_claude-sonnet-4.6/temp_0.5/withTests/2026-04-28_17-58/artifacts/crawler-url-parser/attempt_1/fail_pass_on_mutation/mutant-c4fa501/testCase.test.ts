import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract with index.htm links', () => {
  it('should treat index.htm URL as the same as the base directory URL and remove it from results', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.example.com/index.htm">home</a>
          <a href="http://www.example.com/about">about</a>
        </body>
      </html>
    `;
    const sourceUrl = 'http://www.example.com/index.htm';
    const result = extract(html, sourceUrl);
    // With removeDirectoryIndex: true, the base URL http://www.example.com/ 
    // should match index.htm and be removed, leaving only 'about'
    const urls = result.map((r: any) => r.url);
    expect(urls).not.toContain('http://www.example.com/index.htm');
    expect(result.length).toBe(1);
  });
});