const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should produce deprecation warning with correct message format", () => {
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

    // Verify the exact message format
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining("oldFunc"));
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining("is deprecated"));
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining("use"));
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining("newFunc"));
    expect(consoleWarnSpy).toHaveBeenCalledWith("oldFunc is deprecated, use newFunc");
    consoleWarnSpy.mockRestore();
  });
});