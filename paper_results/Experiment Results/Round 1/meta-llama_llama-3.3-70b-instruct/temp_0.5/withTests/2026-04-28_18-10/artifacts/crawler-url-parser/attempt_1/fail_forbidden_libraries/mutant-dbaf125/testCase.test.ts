import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';
import { JSDOM } from 'jsdom';

describe('extract function', () => {
  it('should handle duplicate text correctly', () => {
    const html = `
      <html>
        <body>
          <a href="https://www.example.com">Example</a>
          <a href="https://www.example.com">Example</a>
        </body>
      </html>
    `;
    const dom = new JSDOM(html);
    const result = extract(dom.window.document, 'https://www.example.com');
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Example Example');
  });
});