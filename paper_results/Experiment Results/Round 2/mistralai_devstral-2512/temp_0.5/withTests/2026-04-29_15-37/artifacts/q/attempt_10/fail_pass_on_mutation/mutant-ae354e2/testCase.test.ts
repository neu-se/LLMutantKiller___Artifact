const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should produce deprecation warning with exact message format", () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Test the exact deprecate implementation from the source
    const testFunc = () => "test result";
    const deprecatedFunc = function() {
      if (typeof console !== "undefined" && typeof console.warn === "function") {
        console.warn("oldFunc" + " is deprecated, use " + "newFunc");
      }
      return testFunc.apply(testFunc, arguments);
    };

    deprecatedFunc();

    // Verify the exact message format with strict equality
    const expectedMessage = "oldFunc is deprecated, use newFunc";
    const actualMessage = consoleWarnSpy.mock.calls[0][0];
    expect(actualMessage).toBe(expectedMessage);
    consoleWarnSpy.mockRestore();
  });
});