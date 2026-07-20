import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL normalization", () => {
  it("should handle www and non-www URLs consistently", () => {
    const urlWithWWW = "http://www.example.com/path";
    const urlWithoutWWW = "http://example.com/path";
    const resultWithWWW = parse(urlWithWWW);
    const resultWithoutWWW = parse(urlWithoutWWW);

    // These should be treated as different URLs since stripWWW isn't actually applied
    expect(resultWithWWW?.host).toBe("www.example.com");
    expect(resultWithoutWWW?.host).toBe("example.com");
    expect(resultWithWWW?.url).not.toBe(resultWithoutWWW?.url);
  });
});