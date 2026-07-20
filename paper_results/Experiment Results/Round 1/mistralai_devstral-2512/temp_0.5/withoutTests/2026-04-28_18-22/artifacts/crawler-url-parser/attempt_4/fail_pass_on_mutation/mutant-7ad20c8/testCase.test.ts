import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute the test code block when module is required", () => {
    // The mutated code will execute the test block and call process.exit()
    // which will prevent the test from completing
    const result = parse("https://www.example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.example.com/");
  });
});