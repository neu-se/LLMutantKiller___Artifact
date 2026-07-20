import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function handles link text', () => {
  it('should extract link text correctly', () => {
    const html = `
      <html>
        <head>
          <base href="http://example.com" />
        </head>
        <body>
          <a href="/test">Link Text</a>
        </body>
      </html>
    `;
    const result = extract(html, 'http://example.com');
    expect(result[0].text).toBe('Link Text');
  });
});