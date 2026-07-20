import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute debug code when module is required", () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // The debug code contains a process.exit() call which will terminate the test
    // We can detect this by checking if the test completes successfully

    const result = parse("http://example.com");
    expect(result).toBeDefined();
    expect(result?.url).toBe("http://example.com/");

    // If we reach this point, the debug code wasn't executed
    // In the mutated version, process.exit() would prevent this
    expect(true).toBe(true);
  });
});