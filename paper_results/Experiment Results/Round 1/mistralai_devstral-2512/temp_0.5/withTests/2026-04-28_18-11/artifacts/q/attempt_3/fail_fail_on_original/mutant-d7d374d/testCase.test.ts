// Test case to detect the mutation in the deprecate function
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should expose deprecate function and call console.warn when console is defined", () => {
    // The Q library exports the deprecate function internally
    // We need to access it through the module's implementation
    const deprecate = qModule.__test_get_deprecate || (() => {
      // Extract deprecate from the module if not directly exposed
      const moduleCode = require('fs').readFileSync("../../../../../../../../../../../subject_repositories/q/q.js", 'utf8');
      const deprecateMatch = moduleCode.match(/function deprecate\\([^)]+\\)\\s*\\{[\\s\\S]*?\\}/);
      if (!deprecateMatch) throw new Error("Could not find deprecate function");
      return new Function(`return ${deprecateMatch[0]}`)();
    })();

    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;
    let warnMessage = null;

    // Mock console.warn to track if it's called
    console.warn = (message: string) => {
      warnCalled = true;
      warnMessage = message;
    };

    // Create a test function to deprecate
    const testFn = () => "test result";
    const deprecatedFn = deprecate(testFn, "testFn", "newFn");

    // Call the deprecated function
    deprecatedFn();

    // Restore console.warn
    console.warn = originalWarn;

    // In the original code, console.warn should be called with the deprecation message
    expect(warnCalled).toBe(true);
    expect(warnMessage).toContain("testFn is deprecated, use newFn instead");
  });
});