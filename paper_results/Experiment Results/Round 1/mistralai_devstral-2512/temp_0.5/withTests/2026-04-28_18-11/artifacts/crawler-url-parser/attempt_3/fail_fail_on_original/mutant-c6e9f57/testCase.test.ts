import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with WWW stripping", () => {
  it("should strip www from URLs when normalize options are present", () => {
    const url = "http://www.example.com/path";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.host).toBe("example.com");
      expect(result.subdomain).toBe("");
    }
  });
});