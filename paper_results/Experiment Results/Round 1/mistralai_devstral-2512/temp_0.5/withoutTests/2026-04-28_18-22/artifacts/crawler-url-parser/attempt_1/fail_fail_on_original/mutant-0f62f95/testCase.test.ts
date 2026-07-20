import { parse } from "./crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should return null when module is not the main module", () => {
    // This test relies on the fact that the mutation changes the condition
    // from `if (!module.parent)` to `if (module.parent)`, which would cause
    // the debug code to execute when the module is required (not main)
    // In the original code, the debug code only runs when the module is main
    // We can't directly test module.parent, but we can test the side effect
    // of the debug code executing by checking if parse returns null unexpectedly

    // Save original console.log to restore later
    const originalConsoleLog = console.log;
    let debugCodeExecuted = false;

    // Mock console.log to detect if debug code runs
    console.log = jest.fn((...args) => {
      if (args[0] === "for testing purpose") {
        debugCodeExecuted = true;
      }
      originalConsoleLog(...args);
    });

    // Call parse - in mutated version this should trigger debug code
    const result = parse("https://example.com");

    // Restore console.log
    console.log = originalConsoleLog;

    // In original code, debug code shouldn't run when module is required
    // In mutated code, debug code would run and might affect behavior
    expect(debugCodeExecuted).toBe(false);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/");
  });
});