const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should include the alternative in the deprecation warning message", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const callback = jest.fn();
    const deprecatedFunction = qModule.deprecate(callback, "deprecatedFunction", "useNewFunction");

    deprecatedFunction();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "deprecatedFunction useNewFunction instead.",
      expect.any(Error)
    );

    consoleWarnSpy.mockRestore();
  });
});