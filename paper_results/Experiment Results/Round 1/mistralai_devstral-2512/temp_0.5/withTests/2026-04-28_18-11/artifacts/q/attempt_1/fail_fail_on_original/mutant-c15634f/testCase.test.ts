// Test case to detect the mutation in the deprecate function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function behavior", () => {
  it("should only show deprecation warning when console.warn is available", () => {
    // Save original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Mock console.warn to track calls
    console.warn = () => {
      warnCalled = true;
    };

    // Test with console.warn available
    const testFn = () => "test";
    const deprecatedFn = Q.deprecate(testFn, "testFn", "use something else");

    // Call the deprecated function
    const result = deprecatedFn();

    // Verify the function still works
    expect(result).toBe("test");
    // Verify console.warn was called
    expect(warnCalled).toBe(true);

    // Restore console.warn
    console.warn = originalWarn;

    // Test with console.warn unavailable
    const originalConsole = console;
    global.console = undefined;

    warnCalled = false;
    const deprecatedFn2 = Q.deprecate(testFn, "testFn", "use something else");
    deprecatedFn2();

    // Verify console.warn was not called when console is undefined
    expect(warnCalled).toBe(false);

    // Restore console
    global.console = originalConsole;
  });
});