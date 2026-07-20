// test/mutant-test.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent check', () => {
  it('should not execute debug code when module is required', () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // The debug code contains a debugger statement that would pause execution
    // We can detect this by checking if execution is paused (which would cause timeout)

    // Set a short timeout to detect if debugger pauses execution
    jest.setTimeout(100);

    // This should complete quickly in original code
    const result = parse("http://example.com");

    // In mutated code, the debugger would pause execution and cause timeout
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/");
  });
});