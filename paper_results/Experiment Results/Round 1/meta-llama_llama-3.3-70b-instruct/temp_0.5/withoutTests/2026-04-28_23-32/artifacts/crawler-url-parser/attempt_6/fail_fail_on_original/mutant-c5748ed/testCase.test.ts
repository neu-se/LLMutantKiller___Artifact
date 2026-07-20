import { gettype } from "./crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "samelevel" for same level URLs', () => {
    const linkurl = "https://example.com/path/to/resource/index.html";
    const pageurl = "https://example.com/path/to/resource/index.html";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
  });
});