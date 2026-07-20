import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype updomain classification', () => {
  it('should classify link from www subdomain to no subdomain as updomain', () => {
    // page: www.stackoverflow.com (subdomain="www", len=3)
    // link: stackoverflow.com (subdomain=null, len=0)
    // linkurl_subdomain_len(0) < pageurl_subdomain_len(3) -> "updomain"
    // This relies on www NOT being stripped (stripWWW:false would keep www)
    // With stripWWW:true: page subdomain stripped to null(0), link null(0) -> NOT updomain -> "subdomain"
    const result = gettype("http://stackoverflow.com/", "http://www.stackoverflow.com/");
    expect(result).toBe("updomain");
  });
});