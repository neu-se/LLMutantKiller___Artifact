import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype subdomain classification with www', () => {
  it('should classify www subdomain link from non-www page as subdomain type', () => {
    // page is at stackoverflow.com (no subdomain)
    // link is at www.stackoverflow.com (www subdomain)
    // With stripWWW: true, www is stripped so both have no subdomain -> internal/samelevel
    // With stripWWW: false, www is kept so link has subdomain -> subdomain type
    const result = gettype("http://www.stackoverflow.com/", "http://stackoverflow.com/");
    expect(result).toBe("subdomain");
  });
});