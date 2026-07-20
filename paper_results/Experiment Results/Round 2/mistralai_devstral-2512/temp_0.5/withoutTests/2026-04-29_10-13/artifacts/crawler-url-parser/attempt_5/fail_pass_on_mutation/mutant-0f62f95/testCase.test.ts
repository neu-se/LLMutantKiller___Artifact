import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not trigger debug code execution when module is required", () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // In the original code, the debug block only executes when run directly
    // In the mutated code, it executes when required as a module
    // The debug block contains a process.exit() call which will terminate the test

    // This test will pass on original code (no debug execution)
    // and fail on mutated code (debug executes and calls process.exit)
    const result = parse("http://example.com");
    expect(result).toBeDefined();
    expect(result?.url).toBe("http://example.com/");
  });
});