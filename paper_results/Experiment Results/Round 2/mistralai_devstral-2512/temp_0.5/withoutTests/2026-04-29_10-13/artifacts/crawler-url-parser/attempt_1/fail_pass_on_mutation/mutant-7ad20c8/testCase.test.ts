import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute the testing code block when required as a module", () => {
    const result = parse("https://www.example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.example.com/");
  });
});