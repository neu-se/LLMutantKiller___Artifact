import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL formatting behavior", () => {
  it("should format URLs without trailing slashes when removeTrailingSlash is true", () => {
    const url = "http://example.com/path/";
    const result = parse(url);
    // The original code has removeTrailingSlash: true
    // The mutated code has removeTrailingSlash: false
    // This should affect the formatted URL output
    expect(result?.url).toBe("http://example.com/path");
  });
});