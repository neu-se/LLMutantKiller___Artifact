import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL normalization behavior", () => {
  it("should not normalize www prefix in URLs", () => {
    const urlWithWWW = "http://www.example.com/path";
    const result = parse(urlWithWWW);
    // This test assumes stripWWW is false (mutated version)
    // It would fail if stripWWW were true and actually applied
    expect(result?.host).toBe("www.example.com");
    expect(result?.url).toBe("http://www.example.com/path");
  });
});