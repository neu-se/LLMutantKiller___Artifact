import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should extract urls correctly', () => {
    const html = `
      <html>
        <body>
          <a href="javascript:void(0)">test-link-1</a>
          <a href="http://www.stackoverflow.com/internal-1">test-link-2</a>
          <a href="ftp://www.stackoverflow.com/internal-2">test-link-3</a>
        </body>
      </html>
    `;
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com/internal-1');
  });
});