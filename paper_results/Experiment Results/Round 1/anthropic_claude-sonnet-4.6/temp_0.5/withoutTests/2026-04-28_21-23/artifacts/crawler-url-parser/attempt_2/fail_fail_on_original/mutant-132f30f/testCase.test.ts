import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser stripWWW option", () => {
  it("should strip www subdomain when stripWWW is true, returning null subdomain for www.example.com", () => {
    const result = parse("http://www.example.com/page");
    expect(result).not.toBeNull();
    // Original (stripWWW: true): subdomain should be null/empty after stripping www
    // Mutant (stripWWW: false): subdomain would be 'www'
    expect(result!.subdomain).toBeNull();
  });
});