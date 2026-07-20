import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should strip www from https URL showing normalize-url options are applied", () => {
    // These options are from normalize-url package
    // stripWWW: true means www.example.com -> example.com
    // If normalize-url is being used, this should strip www
    const result = parse("https://www.example.com/path/to/page");
    expect(result).not.toBeNull();
    // stripWWW is true, so www should be removed
    expect(result!.host).not.toContain("www.");
    // normalizeHttps: false (original) means https stays as https
    // normalizeHttps: true (mutant) means https -> http
    expect(result!.protocol).toBe("https:");
  });
});