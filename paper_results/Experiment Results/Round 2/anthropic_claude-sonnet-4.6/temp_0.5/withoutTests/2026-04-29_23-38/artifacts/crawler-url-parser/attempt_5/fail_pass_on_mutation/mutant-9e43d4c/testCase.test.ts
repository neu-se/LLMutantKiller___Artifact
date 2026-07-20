import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse host and path when resolving against base with double-slash path", () => {
    // baseUrlStr = "http:////example.com/" (starts with http:, not //, so no conversion)
    // parsedBaseUrl = {protocol: "http:", host: "", pathname: "//example.com/"}
    // parsedUrl = {host: null, pathname: "page"} -> enter resolution branch
    // URL.resolve: srcPath = ["","","example.com",""] -> ["","","example.com","page"] -> "//example.com/page"
    // result = {protocol: "http:", host: "", pathname: "//example.com/page"}
    // result.format() = "http:////example.com/page"
    // absoluteUrl = URL.parse("http:////example.com/page") -> {protocol: "http:", host: "", pathname: "//example.com/page"}
    // currentUrlStr = "http:////example.com/page"
    // Second parse: URL.parse("http:////example.com/page", true, true/false)
    // For http: (slashed protocol), host is always parsed regardless of slashesDenoteHost
    // Both give {host: "", pathname: "//example.com/page"}
    // So mutation is a no-op here too...
    
    const result = parse("page", "http:////example.com/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http:////example.com/page");
  });
});