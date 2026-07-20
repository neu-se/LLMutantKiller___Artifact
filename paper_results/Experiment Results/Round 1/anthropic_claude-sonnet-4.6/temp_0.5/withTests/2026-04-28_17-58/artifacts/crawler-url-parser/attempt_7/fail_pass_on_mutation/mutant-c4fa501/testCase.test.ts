const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('extract removes base url with index file', () => {
  it('should remove base url from results when source url contains index file', () => {
    const html = `<html><body>
      <a href="http://www.example.com/index.htm">home</a>
      <a href="http://www.example.com/about">about</a>
      <a href="http://www.example.com/contact">contact</a>
    </body></html>`;
    
    // Source URL is the index page itself
    const result = cup.extract(html, 'http://www.example.com/index.htm');
    
    // The base url (index.htm) should be removed from results
    // leaving only about and contact
    const urls = result.map((r: any) => r.url);
    expect(urls).not.toContain('http://www.example.com/index.htm');
    expect(result.length).toBe(2);
  });
});