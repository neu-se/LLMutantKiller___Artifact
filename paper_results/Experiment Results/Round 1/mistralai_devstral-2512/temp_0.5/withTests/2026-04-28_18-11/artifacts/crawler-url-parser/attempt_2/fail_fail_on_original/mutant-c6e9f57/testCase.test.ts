import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with URL normalization", () => {
  it("should normalize URLs by removing trailing slashes and directory indexes", () => {
    const url = "http://www.example.com/path/index.html";
    const result = parse(url);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://www.example.com/path/");
      expect(result.path).toBe("/path/");
    }
  });
});