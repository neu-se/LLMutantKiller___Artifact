import { gettype } from "./crawler-url-parser";

describe('crawler-url-parser', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path without the last part', () => {
    let linkurl = "http://example.com/path/to/resource";
    let pageurl = "http://example.com/path/to/resource";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
    let linkurlWithoutLastPart = linkurl.replace(/(\/[^\/]*)[\/]?$/, "");
    let pageurlWithoutLastPart = pageurl.replace(/(\/[^\/]*)[\/]?$/, "");
    expect(linkurlWithoutLastPart).toBe(pageurlWithoutLastPart);
  });
});