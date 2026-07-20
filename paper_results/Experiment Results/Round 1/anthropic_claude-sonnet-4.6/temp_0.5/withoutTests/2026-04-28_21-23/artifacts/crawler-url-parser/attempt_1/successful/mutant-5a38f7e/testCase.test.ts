import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with null path", () => {
  it("should return 'external' when linkurl has no path and domains differ", () => {
    // Create a linkurl object with no path (null/undefined)
    const linkurl = {
      url: "http://other.com/",
      protocol: "http:",
      host: "other.com",
      domain: "other.com",
      subdomain: null,
      path: null,
      search: null,
      querycount: 0
    };

    const pageurl = {
      url: "http://example.com/foo/bar",
      protocol: "http:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/foo/bar",
      search: null,
      querycount: 0
    };

    // When linkurl.path is null, original code uses "" as fallback
    // Mutated code uses "Stryker was here!" which would affect path comparisons
    // With same host, the path comparison logic would differ
    // Let's use same host to trigger path comparison
    const linkurlSameHost = {
      url: "http://example.com/",
      protocol: "http:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: null,
      search: null,
      querycount: 0
    };

    const pageurlWithPath = {
      url: "http://example.com/foo",
      protocol: "http:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/foo",
      search: null,
      querycount: 0
    };

    // With original: linkurl_path = "", pageurl_path = "/foo"
    // linkurl_parts = [], pageurl_parts = ["foo"]
    // part_count_diff = 0 - 1 = -1
    // pageurl_path.includes(linkurl_path) => "/foo".includes("") => true => "uplevel"
    
    // With mutant: linkurl_path = "Stryker was here!", pageurl_path = "/foo"
    // linkurl_parts = ["Stryker was here!"], pageurl_parts = ["foo"]
    // part_count_diff = 1 - 1 = 0
    // linkurl_without_last_part = "" (after replacing last part)
    // pageurl_without_last_part = "" (after replacing last part)
    // "" == "" => true => "samelevel"
    
    const result = gettype(linkurlSameHost, pageurlWithPath);
    expect(result).toBe("uplevel");
  });
});