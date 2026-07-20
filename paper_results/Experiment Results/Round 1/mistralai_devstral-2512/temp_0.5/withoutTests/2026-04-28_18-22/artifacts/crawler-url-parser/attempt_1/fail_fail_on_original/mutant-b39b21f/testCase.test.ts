import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function initialization", () => {
  it("should return an object with all expected properties initialized", () => {
    const result = parse("http://example.com");
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("baseurl");
    expect(result).toHaveProperty("protocol");
    expect(result).toHaveProperty("host");
    expect(result).toHaveProperty("domain");
    expect(result).toHaveProperty("subdomain");
    expect(result).toHaveProperty("path");
    expect(result).toHaveProperty("search");
    expect(result).toHaveProperty("querycount");
    expect(result).toHaveProperty("text");
    expect(result).toHaveProperty("type");
  });
});