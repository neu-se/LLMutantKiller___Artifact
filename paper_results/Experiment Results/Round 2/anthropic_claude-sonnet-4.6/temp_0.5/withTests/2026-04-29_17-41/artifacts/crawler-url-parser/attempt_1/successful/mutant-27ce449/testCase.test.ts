import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function with invalid protocol URLs', () => {
  it('should not throw when HTML contains a link with an invalid protocol that parse() returns null for', () => {
    // htp:// passes the initial href filter but parse() returns null for it
    // Original code: if (currentUrl && currentUrl.url) - safely skips null
    // Mutated code: if (true) - tries to access null.url, throws TypeError
    const html = `<html><body>
      <a href="http://www.example.com/valid">valid link</a>
      <a href="htp://www.example.com/invalid">invalid protocol link</a>
    </body></html>`;
    
    expect(() => {
      extract(html, "http://www.example.com/");
    }).not.toThrow();
  });
});