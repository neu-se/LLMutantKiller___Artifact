import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with baseUrl containing fragment", () => {
  it("should correctly resolve a relative URL when baseUrl has a fragment identifier", () => {
    const result = parse("page2.html", "http://www.example.com/dir/#anchor");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBeDefined();
    // The baseurl should not contain the fragment or the mutation string
    expect(result!.baseurl).not.toContain("Stryker was here!");
    // The resolved URL should be valid and not contain mutation artifacts
    expect(result!.url).not.toContain("Stryker was here!");
    // The URL should be properly resolved relative to the base
    expect(result!.host).toBe("www.example.com");
    expect(result!.path).toBe("/dir/page2.html");
  });
});