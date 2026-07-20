import { extract } from '../../../crawler-url-parser.js';

describe('parse function with mutated code', () => {
  it('should fail when run against the mutated code', () => {
    const html = `
      <html>
        <body>
          <a href="https://www.example.com">Example</a>
        </body>
      </html>
    `;
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.example.com/');
    expect(result[0].type).toBe('internal');
  });
});