import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrlStr containing fragment", () => {
  it("should strip fragment from baseUrlStr with multiple characters after #", () => {
    // The mutation changes `/#.*$/` to `/#.$/` which only removes a single char after #
    // So with a fragment like "#section1", the mutated code would only remove "#s" leaving "ection1"
    // while the original removes the entire "#section1"
    
    const currentUrl = "/page";
    const baseUrlWithFragment = "http://example.com/base#section1";
    
    const result = parse(currentUrl, baseUrlWithFragment);
    
    // With original code: baseUrlStr becomes "http://example.com/base"
    // The resolved URL should be "http://example.com/page"
    // With mutated code: baseUrlStr becomes "http://example.com/baseection1" (only "#s" removed)
    // This would cause incorrect URL resolution
    
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/page");
  });
});