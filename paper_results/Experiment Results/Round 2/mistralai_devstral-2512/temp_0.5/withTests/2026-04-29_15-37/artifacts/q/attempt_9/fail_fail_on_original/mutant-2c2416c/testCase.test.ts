const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should include 'instead.' in the deprecation warning message", () => {
    // Get the Q instance by calling the factory
    const Q = qModule();

    // Access the deprecate function through the module's internal structure
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const callback = jest.fn();

    // Try to access deprecate through different possible paths
    let deprecatedFunction;
    if (Q.deprecate) {
      deprecatedFunction = Q.deprecate(callback, "oldFunction", "newFunction");
    } else if (qModule.deprecate) {
      deprecatedFunction = qModule.deprecate(callback, "oldFunction", "newFunction");
    } else {
      // Try to access it through the module's internal definition
      const moduleExports = qModule.toString();
      if (moduleExports.includes('function deprecate')) {
        // The function exists but isn't exported - we need to test it differently
        throw new Error("deprecate function exists but isn't accessible for testing");
      }
    }

    deprecatedFunction();

    // Check that the warning contains " instead."
    const warnCalls = consoleWarnSpy.mock.calls;
    const warningMessage = warnCalls[0][0];

    expect(warningMessage).toContain("oldFunction");
    expect(warningMessage).toContain("newFunction");
    expect(warningMessage).toContain(" instead.");

    consoleWarnSpy.mockRestore();
  });
});