import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function test', () => {
  it('should extract urls correctly', () => {
    const html = `
      <html>
        <body>
          <a href="http://www.stackoverflow.com">test-link-1</a>
          <a href="http://www.stackoverflow.com">test-link-2</a>
          <a href="javascript:void(0)">test-link-3</a>
          <a href="mailto:test@example.com">test-link-4</a>
          <a href="ftp://test.example.com">test-link-5</a>
        </body>
      </html>
    `;
    const baseUrl = 'http://www.example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(2);
  });
});