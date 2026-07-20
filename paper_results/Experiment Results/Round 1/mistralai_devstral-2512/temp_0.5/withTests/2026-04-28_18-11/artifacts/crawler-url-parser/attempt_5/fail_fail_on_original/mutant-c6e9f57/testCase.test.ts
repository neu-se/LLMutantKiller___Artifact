import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment removal", () => {
  it("should remove fragments from URLs when normalize options are present", () => {
    const url = "http://example.com/path#fragment";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/path");
      expect(result.search).toBe("");
    }
  });
});