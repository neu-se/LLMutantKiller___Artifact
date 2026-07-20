import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse mutation detection", () => {
  it("should resolve http:relative correctly against baseUrl", () => {
    // 'http:example.com' - protocol-relative without //
    // Original: 'http:' matches \w+:, no prepend; host=null so resolves against base
    //           -> resolves to 'http://base.com/example.com'
    // Mutated: 'http:' doesn't match \w:, prepends -> 'http://http:example.com'
    //           -> host='http', domain parsed differently
    const result = parse("http:example.com", "http://base.com/");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("base.com");
  });
});