import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with special character handling", () => {
  it("should handle URLs with encoded characters", () => {
    const url = "http://example.com/path%20with%20spaces";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/path%20with%20spaces");
      expect(result.path).toBe("/path%20with%20spaces");
    }
  });
});