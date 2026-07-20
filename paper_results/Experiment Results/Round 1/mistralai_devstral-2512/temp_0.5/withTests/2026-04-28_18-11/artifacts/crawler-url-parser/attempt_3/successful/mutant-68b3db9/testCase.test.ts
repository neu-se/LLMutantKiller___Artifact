import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function trims link text', () => {
  it('should trim whitespace from link text with surrounding spaces', () => {
    const html = `
      <html>
        <head>
          <base href="http://example.com" />
        </head>
        <body>
          <a href="/test">  Link Text With Spaces  </a>
        </body>
      </html>
    `;
    const result = extract(html, 'http://example.com');
    expect(result[0].text).toBe('Link Text With Spaces');
  });
});