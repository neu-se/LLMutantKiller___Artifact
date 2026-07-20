import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype mutation detection", () => {
  it("detects difference in pageurl_path normalization for index files", () => {
    // Pass pre-parsed objects to avoid parse() interference
    const linkurl = {
      url: "http://example.com/section/",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/section/index.html",  // will be normalized to /section/ by linkurl replace
      search: null,
      querycount: 0
    };
    const pageurl = {
      url: "http://example.com/section/sub/",
      host: "example.com", 
      domain: "example.com",
      subdomain: null,
      path: "/section/sub/index.html",  // original: /section/sub/, mutated: /section/sub
      search: null,
      querycount: 0
    };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("uplevel");
  });
});