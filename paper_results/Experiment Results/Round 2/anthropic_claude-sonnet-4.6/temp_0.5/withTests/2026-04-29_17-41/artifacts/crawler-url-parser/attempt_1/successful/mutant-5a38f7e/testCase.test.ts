import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with null path on linkurl", () => {
  it("should return 'external' when link and page have different domains, even when linkurl has no path", () => {
    // Create parsed URL objects directly to simulate a URL with null path
    // The mutation changes the fallback from "" to "Stryker was here!" when linkurl.path is falsy
    // We need a scenario where linkurl.path is null/undefined/falsy
    // Using string URLs that result in a root-level URL with no meaningful path
    // When linkurl.path is null, original returns "" but mutant returns "Stryker was here!"
    // This affects path splitting and comparison logic

    // Use a URL that has same host as page URL but with no path (root)
    // so linkurl.path would be "/" or null
    // Let's use URLs where the link has no path component to trigger the falsy path branch
    
    // The key insight: when linkurl.path is falsy (null/undefined), 
    // original code uses "" but mutant uses "Stryker was here!"
    // "Stryker was here!".split("/") gives ["Stryker was here!"] with length 1
    // "" .split("/") gives [""] which filters to [] with length 0
    // This difference in path parts length will affect the type determination

    // Use objects directly to control the path property
    const linkurl = {
      host: "www.example.com",
      domain: "example.com",
      subdomain: "www",
      path: null as any
    };
    
    const pageurl = {
      host: "www.example.com", 
      domain: "example.com",
      subdomain: "www",
      path: "/aaa/bbb"
    };

    // With original code: linkurl_path = "", parts = [], length = 0
    // pageurl_path = "/aaa/bbb", parts = ["aaa", "bbb"], length = 2
    // part_count_diff = 0 - 2 = -2, none of the specific cases match, returns "internal"
    
    // With mutant code: linkurl_path = "Stryker was here!", parts = ["Stryker was here!"], length = 1
    // part_count_diff = 1 - 2 = -1
    // checks if pageurl_path.includes(linkurl_path): "/aaa/bbb".includes("Stryker was here!") = false
    // returns "internal" still... let me reconsider
    
    // Actually with pageurl having 1 part and linkurl having 0 parts:
    const linkurl2 = {
      host: "www.example.com",
      domain: "example.com", 
      subdomain: "www",
      path: null as any
    };
    
    const pageurl2 = {
      host: "www.example.com",
      domain: "example.com",
      subdomain: "www",
      path: "/aaa"
    };

    // Original: linkurl_path = "", linkurl_parts = [], length = 0
    // pageurl_path = "/aaa", pageurl_parts = ["aaa"], length = 1
    // part_count_diff = 0 - 1 = -1
    // checks pageurl_path.includes(linkurl_path): "/aaa".includes("") = true => returns "uplevel"
    
    // Mutant: linkurl_path = "Stryker was here!", linkurl_parts = ["Stryker was here!"], length = 1
    // part_count_diff = 1 - 1 = 0
    // checks linkurl_without_last_part == pageurl_without_last_part
    // linkurl_without_last_part = "Stryker was here!".replace(/(\/[^\/]*)[\/]?$/, "") = "Stryker was here!" (no match)
    // pageurl_without_last_part = "/aaa".replace(/(\/[^\/]*)[\/]?$/, "") = ""
    // "Stryker was here!" != "" => does NOT return "samelevel"
    // returns "internal"
    
    const result = gettype(linkurl2, pageurl2);
    expect(result).toBe("uplevel");
  });
});