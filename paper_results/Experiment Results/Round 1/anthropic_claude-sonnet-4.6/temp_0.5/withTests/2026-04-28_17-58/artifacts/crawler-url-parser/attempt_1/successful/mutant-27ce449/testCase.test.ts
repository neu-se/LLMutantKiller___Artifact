import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with invalid href that causes parse to return null', () => {
  it('should not throw and should exclude links where parse returns null (e.g., ftp:// links)', () => {
    // ftp:// links are filtered by the href check in extract, but a link with an invalid protocol
    // like "htp://" would pass the href filter but cause parse() to return null.
    // With the original code: currentUrl is null, the if(currentUrl && currentUrl.url) guard skips it safely.
    // With the mutated code: if(true) always enters the block and tries to access currentUrl.url on null, throwing an error.
    const html = `
      <html>
        <body>
          <a href="htp://www.example.com/page">invalid protocol link</a>
          <a href="http://www.example.com/valid">valid link</a>
        </body>
      </html>
    `;
    const sourceUrl = 'http://www.example.com/';
    
    // Original code should handle null currentUrl gracefully and return only valid URLs
    const result = extract(html, sourceUrl);
    
    // The invalid protocol link should be excluded, only the valid one should remain
    // (base url is also removed, so valid link should be present)
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.example.com/valid');
  });
});