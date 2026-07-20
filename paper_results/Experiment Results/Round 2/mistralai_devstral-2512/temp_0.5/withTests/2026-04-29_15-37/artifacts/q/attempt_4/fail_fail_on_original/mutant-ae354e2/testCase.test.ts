const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should produce correct deprecation warning message", () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const testFunc = () => "test result";
    // Access the deprecate function from the module's internal scope
    const deprecate = qModule.__test__getDeprecate();
    const deprecatedFunc = deprecate(testFunc, "oldFunc", "newFunc");

    deprecatedFunc();

    expect(consoleWarnSpy).toHaveBeenCalledWith("oldFunc is deprecated, use newFunc");
    consoleWarnSpy.mockRestore();
  });
});