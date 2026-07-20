import { gettype } from "./crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    let linkurl = "http://example.com/path/index.html/subpath";
    let pageurl = "http://example.com/path/index.html";
    expect(gettype(linkurl, pageurl)).toBe("sublevel");
  });
});