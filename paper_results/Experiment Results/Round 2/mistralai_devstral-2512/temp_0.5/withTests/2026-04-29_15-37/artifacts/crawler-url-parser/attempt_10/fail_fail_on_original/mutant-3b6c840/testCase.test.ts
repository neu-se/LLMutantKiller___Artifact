import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL parsing with trailing slashes", () => {
  it("should handle trailing slashes in base URLs correctly", () => {
    const result = parse("path/", "http://example.com/base/");
    // This tests the actual URL resolution behavior
    // The mutation shouldn't affect this since the option isn't used
    expect(result?.url).toBe("http://example.com/path/");
  });
});