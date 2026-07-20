import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("module execution behavior", () => {
  it("should not execute testing code when required as a module", () => {
    // Store original console.log to detect if it was called by testing code
    const originalLog = console.log;
    let logCalled = false;
    console.log = (...args) => {
      if (args[0] === "for testing purpose") {
        logCalled = true;
      }
      originalLog(...args);
    };

    // The mutation changes the condition from `if (!module.parent)` to `if (true)`
    // This will cause the testing code block to execute when the module is required
    const result = parse("https://www.example.com");

    // Restore original console.log
    console.log = originalLog;

    // In original code, testing block shouldn't execute
    expect(logCalled).toBe(false);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.example.com/");
  });
});