import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should skip hrefs that are undefined or too short', () => {
  it('should not include links with href shorter than 3 characters in extracted results', () => {
    // The original code skips hrefs that are undefined, have length < 3, or match javascript/mailto/ftp
    // The mutated code removes the undefined and length < 3 checks (replaces with `false`)
    // An anchor with href of length < 3 (e.g., "ab") should be skipped in original but included in mutated
    const html = `<html><body>
      <a href="ab">short link</a>
      <a href="http://www.example.com/valid">valid link</a>
    </body></html>`;
    
    const result = extract(html, "http://www.example.com/");
    
    // In the original code, "ab" has length < 3 (length == 2), so it should be skipped
    // The result should only contain the valid link
    // In the mutated code, "ab" won't be skipped due to length check removal
    // and will be processed (potentially causing an error or being included)
    
    // The valid link should be present
    const validLinks = result.filter((el: any) => el.url && el.url.includes('valid'));
    expect(validLinks.length).toBe(1);
    
    // The short "ab" href should NOT be included as a valid extracted URL
    // In original: skipped because href.length < 3
    // In mutated: not skipped, but "ab" resolves to "http://www.example.com/ab" which would be included
    const shortLinks = result.filter((el: any) => el.url && el.url.includes('/ab'));
    expect(shortLinks.length).toBe(0);
  });
});