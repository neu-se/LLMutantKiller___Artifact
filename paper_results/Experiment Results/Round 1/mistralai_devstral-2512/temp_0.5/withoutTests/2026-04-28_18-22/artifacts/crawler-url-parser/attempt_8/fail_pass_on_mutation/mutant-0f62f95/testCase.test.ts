import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute debug code when module is required", () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // In the mutated version, the debug code will execute when the module is required
    // The debug code contains a debugger statement that will pause execution
    // We can detect this by measuring execution time

    const startTime = Date.now();
    const result = parse("https://example.com");
    const endTime = Date.now();

    // In original code, execution should be fast (<100ms)
    // In mutated code, debugger would pause execution making it much slower
    expect(endTime - startTime).toBeLessThan(100);

    // Also verify normal functionality
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/");
  });
});