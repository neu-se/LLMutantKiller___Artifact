import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute the test code block when module is required", () => {
    // This test will fail on the mutated code because the test code block will execute
    // and call process.exit(), causing the test to fail
    const result = parse("https://www.example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.example.com/");
  });
});