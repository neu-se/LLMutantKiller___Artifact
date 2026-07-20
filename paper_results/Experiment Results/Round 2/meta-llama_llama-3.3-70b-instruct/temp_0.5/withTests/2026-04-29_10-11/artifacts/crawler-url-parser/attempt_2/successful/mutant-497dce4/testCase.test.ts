import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should extract urls correctly', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.stackoverflow.com/aaa/bbb/ccc">test-link-1</a>
          <a href="http://www.stackoverflow.com/aaa/bbb/ccc">test-link-2</a>
        </body>
      </html>
    `;
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com/aaa/bbb/ccc');
    expect(result[0].text).toBe('test-link-1 test-link-2');
  });
});