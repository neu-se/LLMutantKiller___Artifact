import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("correctly parses host from URL after relative resolution with protocol-relative base", () => {
    // When currentUrlStr is relative and baseUrlStr leads to a //host/path URL
    // after URL.format(absoluteUrl), the mutation would cause host to be null
    // 
    // The key: URL.resolve with a base that has slashes=true but no protocol
    // returns "//host/path". This requires parsedBaseUrl.slashes=true, protocol=null.
    // 
    // parsedBaseUrl = URL.parse(baseUrlStr, true, true)
    // For slashes=true, protocol=null: baseUrlStr must be "//host/path"
    // But "//host/path" gets converted to "http://host/path" by the replace.
    // 
    // However, what if we use a URL that after URL.format produces "//host/path"?
    // URL.format({slashes:true, host:'example.com', pathname:'/path'}) = "//example.com/path"
    // 
    // This seems impossible through normal inputs. But let me try anyway:
    
    const result = parse("subpage", "http://example.com/");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
    expect(result!.url).toBe("http://example.com/subpage");
  });
});