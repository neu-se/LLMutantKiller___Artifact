import { extract } from '../../crawler-url-parser';

describe('extract function', () => {
  it('should handle the mutation correctly', () => {
    const htmlString = `
      <html>
        <body>
          <a href="http://www.stackoverflow.com/internal-1">test-link-1</a>
          <a href="http://www.stackoverflow.com/internal-2">test-link-2</a>
          <a href="http://www.stackoverflow.com/internal-2">test-link-3</a>
        </body>
      </html>
    `;
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe('http://www.stackoverflow.com/internal-1');
    expect(result[1].url).toBe('http://www.stackoverflow.com/internal-2');
  });
});