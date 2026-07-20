import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should extract urls correctly', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.stackoverflow.com/aaa/bbb/ccc">test-link-1</a>
          <a href="http://www.stackoverflow.com/aaa/bbb/ddd">test-link-2</a>
          <a href="http://www.stackoverflow.com/aaa/bbb/eee">test-link-3</a>
        </body>
      </html>
    `;
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(3);
    expect(result[0].url).toBe('http://www.stackoverflow.com/aaa/bbb/ccc');
    expect(result[1].url).toBe('http://www.stackoverflow.com/aaa/bbb/ddd');
    expect(result[2].url).toBe('http://www.stackoverflow.com/aaa/bbb/eee');
  });
});