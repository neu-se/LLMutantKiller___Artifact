import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser www handling", () => {
  it("should preserve www in the url field when parsing www URLs", () => {
    const result = parse("http://www.example.com/page");
    expect(result).not.toBeNull();
    // Since stripWWW option is not applied in parse(), www is always preserved
    // Both original and mutant should have www in subdomain
    expect(result!.subdomain).toBe("www");
    expect(result!.url).toContain("www.example.com");
  });
});