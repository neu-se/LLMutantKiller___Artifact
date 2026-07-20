import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with fragment resolved against base', () => {
  it('should resolve relative URL correctly when fragment has exactly two chars', () => {
    // With base URL, parsedUrl is used in URL.resolve(parsedBaseUrl, parsedUrl)
    // URL.resolve uses URL.format(parsedUrl) internally
    // After delete parsedUrl.hash, URL.format gives "ddd" (no hash)
    // But URL.resolve might use parsedUrl.href which still has "#ab"
    // Let's check: does URL.resolve with object use href or formatted string?
    // Node url.resolve: if second arg is object, it calls url.format on it
    // url.format with object: uses protocol, host, pathname, search, hash
    // Since hash is deleted, format gives no hash -> resolve works correctly
    // 
    // The ONLY remaining difference must be in the `search` field when fragment
    // contains something that looks like a query in a non-standard URL
    //
    // What about a URL where the path itself has a hash that makes URL.parse
    // treat part of the path as a hash, affecting pathname?
    // "/path#/more/path" - hash="#/more/path", pathname="/path"
    // Original removes "#/more/path" first -> "/path" -> pathname="/path" ✓
    // Mutated: keeps "#/more/path" -> URL.parse -> pathname="/path", hash="#/more/path"
    // delete hash -> format -> "/path" -> same!
    
    // I need to find where delete parsedUrl.hash is NOT sufficient...
    // Looking at code again: ret.path = parsedUrl.pathname - not affected by hash
    // ret.search = parsedUrl.search - not affected by hash  
    // ret.url = URL.format(parsedUrl) - affected by hash, but hash is deleted
    
    // The SECOND URL.parse at the end: parsedUrl = URL.parse(currentUrlStr, true, true)
    // For non-relative URLs, currentUrlStr is NOT updated after the if block
    // So currentUrlStr still has "#ab" from mutated code
    // parsedUrl = URL.parse("http://example.com/page#ab") -> hash="#ab"
    // delete parsedUrl.hash -> format -> "http://example.com/page" ✓
    
    // Wait - what about the `search` parsing when there's a hash?
    // "http://example.com/page?q=1#ab" 
    // URL.parse -> search="?q=1", hash="#ab" -> delete hash -> format -> "http://example.com/page?q=1"
    // Same either way.
    
    // I wonder if the issue is with URLs that have NO protocol and NO base
    // where the regex check `!/^\.*\/|^(?!localhost)\w+:/.test(currentUrlStr)` 
    // behaves differently with fragment present
    // "example.com#ab": regex test - \w+: needs colon, ^\.*\/ needs slash - neither matches
    // So http:// added -> "http://example.com#ab" -> parse -> hash="#ab", host="example.com"
    // delete hash -> format -> "http://example.com/" -> same!
    
    // The ONLY case I can think of where it differs:
    // A URL where keeping the fragment causes URL.parse to interpret the URL differently
    // such that even after delete hash, the result differs
    // 
    // What about: the fragment removal affects the `//` -> `http://` replacement?
    // "//host#ab" -> replace(/^\/\//, 'http://') -> "http://host#ab"
    // Original then: replace(/#.*$/) -> "http://host" 
    // Mutated: replace(/#.$/) doesn't match "#ab" -> "http://host#ab"
    // Both: URL.parse -> delete hash -> format -> "http://host/" -> same!
    
    // I'm stuck. Let me try: does URL.format include hash="" (empty string) differently?
    // When original URL is "http://example.com/#" 
    // URL.parse("http://example.com/#") -> hash="" (empty string, not undefined)
    // delete parsedUrl.hash -> hash property removed
    // URL.format -> no hash -> "http://example.com/"
    // With mutated, "#" not removed (/#.$/ needs one char after #)
    // URL.parse("http://example.com/#") -> hash="" 
    // delete parsedUrl.hash -> same result
    // Still same!
    
    // BREAKTHROUGH IDEA: What if we look at `parsedUrl.search` when the URL has
    // a fragment that comes BEFORE a query string in a malformed URL?
    // "http://example.com/#?q=1" 
    // Original: removes "#?q=1" -> "http://example.com/" -> search=null, querycount=0
    // Mutated: keeps "#?q=1" -> URL.parse -> hash="#?q=1", search=null -> delete hash
    // -> format -> "http://example.com/" -> search=null, querycount=0 -> same!
    
    // What about the `path` when fragment is in path position for relative URL?
    // Relative URL with base: "page#ab" 
    // Original: "page" -> URL.parse -> pathname="page", no hash
    //   -> URL.resolve(base, {pathname:"page"}) -> absolute URL
    // Mutated: "page#ab" -> URL.parse -> pathname="page", hash="#ab"
    //   -> delete hash -> URL.resolve(base, {pathname:"page"}) -> same!
    
    // I think the key might be in how URL.resolve handles the object
    // Let me check if URL.resolve(base, obj) calls url.format(obj) or uses obj.href
    // In Node's url module source, url.resolve calls url.resolveObject
    // url.resolveObject with object source uses the object's properties directly
    // NOT href. So delete hash DOES work for URL.resolve too.
    
    // FINAL IDEA: The mutation only matters for the `search` field when
    // the URL has a fragment that looks like it contains query params
    // AND the URL module puts those in search instead of hash
    // This would require a very malformed URL...
    
    // Actually - what about a URL where `#` appears in the query string position
    // due to no `?` separator? Like "http://example.com/page#key=value"
    // URL.parse -> hash="#key=value", search=null
    // Original: removes "#key=value" -> search=null, querycount=0
    // Mutated: keeps it -> URL.parse -> hash="#key=value" -> delete -> search=null -> same!
    
    // I give up trying to reason and will try a direct experiment approach
    // focusing on what the Node url module does with href after delete hash
    
    const result = parse("/aaa#bc", "http://www.example.com/");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/aaa");
  });
});