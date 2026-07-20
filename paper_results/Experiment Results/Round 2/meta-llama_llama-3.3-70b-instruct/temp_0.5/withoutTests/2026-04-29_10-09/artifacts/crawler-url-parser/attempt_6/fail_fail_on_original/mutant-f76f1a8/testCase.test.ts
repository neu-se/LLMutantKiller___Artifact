import { gettype } from "./crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" when link and page have the same path', () => {
    const linkurl = "http://example.com/path/to/index.js";
    const pageurl = "http://example.com/path/to/default.js";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
  });
});