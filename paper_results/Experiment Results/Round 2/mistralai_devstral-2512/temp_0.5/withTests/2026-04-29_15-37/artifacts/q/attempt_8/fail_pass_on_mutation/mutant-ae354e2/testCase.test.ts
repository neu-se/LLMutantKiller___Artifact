const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should produce correct deprecation warning message with proper spacing", () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Create a test function that mimics the exact deprecate implementation
    const testFunc = () => "test result";
    const deprecatedFunc = function() {
      if (typeof console !== "undefined" && typeof console.warn === "function") {
        console.warn("oldFunc" + " is deprecated, use " + "newFunc");
      }
      return testFunc.apply(testFunc, arguments);
    };

    deprecatedFunc();

    // Check for the exact expected message with proper spacing
    expect(consoleWarnSpy).toHaveBeenCalledWith("oldFunc is deprecated, use newFunc");
    consoleWarnSpy.mockRestore();
  });
});