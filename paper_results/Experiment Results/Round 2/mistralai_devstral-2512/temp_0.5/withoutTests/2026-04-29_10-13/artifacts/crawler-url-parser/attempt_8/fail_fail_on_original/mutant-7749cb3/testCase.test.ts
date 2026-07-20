import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly normalize default.htm in path comparison", () => {
    const linkurl = "http://example.com/path/default.htm";
    const pageurl = "http://example.com/path/default.htm/";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});