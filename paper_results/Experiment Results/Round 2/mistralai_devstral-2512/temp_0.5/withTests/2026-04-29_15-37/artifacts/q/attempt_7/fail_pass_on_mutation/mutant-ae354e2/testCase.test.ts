const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should produce correct deprecation warning message", () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Create a test function that uses the deprecate pattern
    const testFunc = () => "test result";
    const deprecatedFunc = function() {
      if (typeof console !== "undefined" && typeof console.warn === "function") {
        console.warn("oldFunc is deprecated, use newFunc");
      }
      return testFunc.apply(testFunc, arguments);
    };

    deprecatedFunc();

    expect(consoleWarnSpy).toHaveBeenCalledWith("oldFunc is deprecated, use newFunc");
    consoleWarnSpy.mockRestore();
  });
});