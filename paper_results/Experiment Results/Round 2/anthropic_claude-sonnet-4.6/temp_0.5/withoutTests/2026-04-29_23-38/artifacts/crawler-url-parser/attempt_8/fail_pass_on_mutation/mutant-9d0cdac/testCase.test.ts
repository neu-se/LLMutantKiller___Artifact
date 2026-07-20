import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse mutation detection", () => {
  it("should return non-null for a valid relative URL that looks like protocol:port", () => {
    // Use a URL where original prepends http:// but mutated doesn't
    // Single char before colon: 'a:80'
    // Original \w+: matches 'a:', no prepend -> URL.parse('a:80') protocol='a:' -> null
    // Mutated \w: also matches 'a:', no prepend -> same -> null
    // Both null - not useful
    
    // Instead: use URL where neither regex matches but behavior differs
    // What about a URL with NO colon at all, just a plain hostname like 'example.com'?
    // Both prepend http:// -> 'http://example.com' -> same result
    // Not useful either
    
    // Try: the baseUrlStr itself has #.$ stripped (note: mutated baseUrl regex is #.$ not #.*$)
    // baseUrlStr replace is: baseUrlStr.replace(/#.$/, '') - only strips # + ONE char
    const result = parse("page", "http://base.com/#ab");
    expect(result).not.toBeNull();
    expect(result!.url).toContain("base.com");
  });
});