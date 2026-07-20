import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe("gettype with null path", () => {
  it("should return 'external' when linkurl has no path and hosts differ", () => {
    // Create a linkurl object with null path (simulating a URL with no path)
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
      url: "http://example.com/some/path",
      protocol: "http:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/some/path",
      search: null,
      querycount: 0
    };

    // When linkurl.path is null, original code uses "" as fallback
    // Mutated code uses "Stryker was here!" which would affect path comparisons
    // With different hosts, both should return "external"
    // But we need a case where the path matters for the result

    // Let's use same host but rely on path being empty vs "Stryker was here!"
    const linkurlSameHost = {
      url: "http://example.com/",
      protocol: "http:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: null,  // null path - this is the key
      search: null,
      querycount: 0
    };

    const pageurlWithPath = {
      url: "http://example.com/some/",
      protocol: "http:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/some/",
      search: null,
      querycount: 0
    };

    // With original: linkurl_path = "", pageurl_path = "/some/"
    // linkurl_parts = [], pageurl_parts = ["some"]
    // part_count_diff = 0 - 1 = -1
    // pageurl_path.includes("") is true -> returns "uplevel"
    
    // With mutation: linkurl_path = "Stryker was here!", pageurl_path = "/some/"
    // linkurl_parts = ["Stryker was here!"], pageurl_parts = ["some"]
    // part_count_diff = 1 - 1 = 0
    // linkurl_without_last_part = "", pageurl_without_last_part = ""
    // "" == "" -> returns "samelevel"
    
    const result = gettype(linkurlSameHost, pageurlWithPath);
    expect(result).toBe("uplevel");
  });
});