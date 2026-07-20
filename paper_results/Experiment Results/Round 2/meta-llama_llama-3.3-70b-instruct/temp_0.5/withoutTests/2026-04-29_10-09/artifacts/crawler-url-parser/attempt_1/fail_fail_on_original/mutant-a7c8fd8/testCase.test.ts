import { gettype } from "../../../crawler-url-parser.js";

describe('gettype function', () => {
  it('should correctly classify link types', () => {
    let linkurl = "http://example.com/default.html";
    let pageurl = "http://example.com/";
    let result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});