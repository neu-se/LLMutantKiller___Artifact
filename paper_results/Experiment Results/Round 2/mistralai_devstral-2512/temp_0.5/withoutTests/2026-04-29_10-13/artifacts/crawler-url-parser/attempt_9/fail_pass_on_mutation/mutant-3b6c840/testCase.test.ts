import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with special characters", () => {
  it("should handle URLs with trailing slashes correctly", () => {
    const url = "http://example.com/path/";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBeDefined();
    expect(result?.path).toBe("/path/");
  });
});