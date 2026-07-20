const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should handle missing console gracefully", () => {
    const originalConsole = global.console;
    // @ts-expect-error - intentionally deleting console for test
    delete global.console;

    // Create a simple function to deprecate
    const testFunc = function() {
      return "test result";
    };

    // In the original code, this should not throw an error when console is undefined
    // In the mutated code, this will try to access console.warn and throw an error
    expect(() => {
      Q.deprecate(testFunc, "oldFunc", "newFunc")();
    }).not.toThrow();

    global.console = originalConsole;
  });
});