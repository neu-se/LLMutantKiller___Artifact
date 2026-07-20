import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("correctly parses host when resolving relative URL that produces protocol-relative result", () => {
    // When parsedBaseUrl has no protocol (baseUrlStr without // prefix)
    // and parsedUrl has slashes=true (from http:// URL where host=null),
    // URL.resolve may produce "//host/path"
    // Original (slashesDenoteHost=true): host is correctly identified
    // Mutated (slashesDenoteHost=false): host is null
    const result = parse("//example.com/path", "example.com/dir/");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("example.com");
    expect(result!.domain).toBe("example.com");
  });
});