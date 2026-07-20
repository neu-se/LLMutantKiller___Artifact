import { gettype } from "./crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type for URLs with index.html', () => {
    const linkurl = "https://example.com/path/to/resource/index.html";
    const pageurl = "https://example.com/path/to/resource/index.html";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
  });
});