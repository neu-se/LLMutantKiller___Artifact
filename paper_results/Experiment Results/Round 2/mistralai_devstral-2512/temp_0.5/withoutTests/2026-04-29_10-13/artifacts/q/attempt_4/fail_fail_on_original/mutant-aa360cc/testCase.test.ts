const Q = require("../../../../../../../../../../../subject_repositories/q/q.js").Q;

describe("deprecation warning", () => {
  it("should emit a deprecation warning when a deprecated function is called", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const deprecatedFn = Q.deprecate(() => "result", "oldFunction", "newFunction");
    deprecatedFn();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "oldFunction is deprecated, use newFunction instead.",
      expect.any(String)
    );
    consoleWarnSpy.mockRestore();
  });
});