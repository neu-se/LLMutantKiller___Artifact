import { gettype, parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("should return uplevel not internal when linkurl path is /aaa/default.html and pageurl path ends with /aaa", () => {
    const linkurl = parse("http://example.com/aaa/default.html");
    const pageurl = parse("http://example.com/bbb/aaa");
    // Manually verify paths
    // linkurl.path = /aaa/default.html -> normalized: original /aaa/, mutated /aaa  
    // pageurl.path = /bbb/aaa
    // parts: link=['aaa'], page=['bbb','aaa'], diff=-1
    // pageurl_path.includes(linkurl_path):
    //   original: /bbb/aaa.includes(/aaa/) = false -> internal
    //   mutated:  /bbb/aaa.includes(/aaa) = true -> uplevel
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});