import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should correctly parse URL with ref query parameter and include it in search", () => {
    const result = parse("http://example.com/page?ref=home&other=val");
    expect(result).not.toBeNull();
    expect(result.search).toBe("?ref=home&other=val");
    expect(result.querycount).toBe(2);
  });
});