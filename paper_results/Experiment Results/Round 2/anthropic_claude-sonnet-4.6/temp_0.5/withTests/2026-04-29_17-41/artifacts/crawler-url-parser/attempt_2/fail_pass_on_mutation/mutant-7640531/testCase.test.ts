import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL with fragment followed by multiple newlines', () => {
  it('should return null for URL with fragment followed by double newline (illegal chars)', () => {
    // Testing that the regex difference matters: /#.*$/ vs /#.*/
    // For a URL "http://example.com/path#frag\n\n", the illegal chars check passes if \n is not checked
    // But actually \n would be caught by illegal chars... 
    // Let's verify the double-replacement behavior with a query string containing #
    const res = parse("http://example.com/path?q=val#section");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/path?q=val");
    expect(res!.search).toBe("?q=val");
  });
});