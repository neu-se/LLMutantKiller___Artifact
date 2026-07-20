import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function test', () => {
  it('should extract urls correctly', () => {
    const htmlString = `
      <html>
        <body>
          <a href="javascript:void(0)">test-link-1</a>
          <a href="http://www.stackoverflow.com/internal-1">test-link-2</a>
          <a href="http://sub.stackoverflow.com/subdomain-1">test-link-3</a>
          <a href="http://www.google.com/external-1">test-link-4</a>
        </body>
      </html>
    `;
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(3);
  });
});