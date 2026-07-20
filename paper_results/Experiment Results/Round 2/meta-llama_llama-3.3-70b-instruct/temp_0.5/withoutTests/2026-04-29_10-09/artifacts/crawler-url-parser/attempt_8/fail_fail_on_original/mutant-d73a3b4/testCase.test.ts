import { gettype } from "./crawler-url-parser.js";

describe('gettype function', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = "https://www.example.com/index.html";
    const pageurl = "https://www.example.com/index";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});