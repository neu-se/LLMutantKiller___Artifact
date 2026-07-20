import { gettype } from "./crawler-url-parser";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    let linkurl = "http://example.com/index.html/subpath/index.html";
    let pageurl = "http://example.com/index.html";
    expect(gettype(linkurl, pageurl)).toBe("sublevel");
  });
});