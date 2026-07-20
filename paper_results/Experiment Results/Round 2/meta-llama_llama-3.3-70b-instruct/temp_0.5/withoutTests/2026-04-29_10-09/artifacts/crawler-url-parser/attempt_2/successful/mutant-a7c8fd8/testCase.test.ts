import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should correctly classify link types', () => {
    let linkurl = "http://example.com/default.asp";
    let pageurl = "http://example.com/";
    let resultOriginal = gettype(linkurl, pageurl);
    expect(resultOriginal).toBe("samelevel");

    // Mutation should cause this test to fail
    linkurl = "http://example.com/default.as";
    resultOriginal = gettype(linkurl, pageurl);
    expect(resultOriginal).toBe("samelevel");
  });
});