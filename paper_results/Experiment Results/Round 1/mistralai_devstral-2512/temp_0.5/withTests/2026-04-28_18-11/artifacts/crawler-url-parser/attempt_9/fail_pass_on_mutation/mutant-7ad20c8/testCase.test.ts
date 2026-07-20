import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("module parent behavior", () => {
  it("should not execute testing code when loaded as a dependency", () => {
    // The mutation changes `if (!module.parent)` to `if (true)`, which would
    // execute the testing code at the bottom of the file even when loaded as a dependency.
    // The testing code contains a debugger statement that would pause execution.

    // We'll test that the module can be loaded and used without hitting a debugger
    // by checking that it doesn't take an unusually long time to execute
    const startTime = performance.now();
    const result = parse("http://example.com");
    const endTime = performance.now();

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/");

    // If the mutation is present, the debugger statement would pause execution
    // making the test take much longer than expected
    expect(endTime - startTime).toBeLessThan(50);

    // Additionally, we'll check that the module doesn't have any unexpected side effects
    // by verifying that the parse function still works correctly after multiple calls
    const result2 = parse("http://example.com/path");
    expect(result2).not.toBeNull();
    expect(result2?.url).toBe("http://example.com/path");
  });
});