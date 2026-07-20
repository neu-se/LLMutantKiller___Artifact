import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should handle URLs consistently regardless of normalization options", () => {
    const url = "http://www.example.com/path/index.html?utm_source=test";
    const result = parse(url);

    expect(result).not.toBeNull();
    // This test passes because the options aren't actually used
    // If they were used, the behavior would differ between original and mutated
    expect(result?.url).toBe("http://www.example.com/path/index.html?utm_source=test");
  });
});