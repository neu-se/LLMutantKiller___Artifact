import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should not execute debug code when module is required", () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // In the mutated version, the debug code will execute when the module is required
    // The debug code calls parse() with an invalid URL containing a space
    // This should cause parse() to return null, which we can detect

    // Mock console.log to detect debug output
    const originalConsoleLog = console.log;
    let debugOutputDetected = false;
    console.log = jest.fn((...args) => {
      if (args[0] === "for testing purpose") {
        debugOutputDetected = true;
      }
      originalConsoleLog(...args);
    });

    // Call parse - in mutated version this should trigger debug code
    const result = parse("https://example.com");

    // Restore console.log
    console.log = originalConsoleLog;

    // In original code, debug code shouldn't run when module is required
    expect(debugOutputDetected).toBe(false);
    // Verify parse still works correctly
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://example.com/");
  });
});