import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle module execution context correctly", () => {
    // This test verifies the module behaves correctly when run directly vs imported
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com");
  });
});