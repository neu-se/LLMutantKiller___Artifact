import { gettype } from "../crawler-url-parser.js";

describe('gettype function', () => {
  it('should return correct type for same level links', () => {
    const linkurl = "https://www.example.com/aaa/bbb/index.html";
    const pageurl = "https://www.example.com/aaa/bbb/default.htm";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});