import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle encoded query parameters in relative URL resolution", () => {
    const result = parse("search?q=hello+world", "http://example.com/");
    expect(result).not.toBeNull();
    expect(result!.url).toContain("q=hello");
  });
});