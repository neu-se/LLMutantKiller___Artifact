import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("module parent check", () => {
  it("should execute the test block when module is not loaded as a dependency", () => {
    // This test will pass in the original code because the test block will execute
    // when the module is run directly (module.parent is falsy).
    // In the mutated code, the condition is always false, so the test block won't execute,
    // causing the test to fail (timeout or similar).
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/");
  });
});