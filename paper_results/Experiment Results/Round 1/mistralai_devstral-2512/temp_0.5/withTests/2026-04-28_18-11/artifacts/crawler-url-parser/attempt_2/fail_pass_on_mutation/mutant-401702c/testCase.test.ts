import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol detection", () => {
  it("should correctly handle URLs starting with special characters", () => {
    const result = parse("_example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://_example.com/");
  });
});