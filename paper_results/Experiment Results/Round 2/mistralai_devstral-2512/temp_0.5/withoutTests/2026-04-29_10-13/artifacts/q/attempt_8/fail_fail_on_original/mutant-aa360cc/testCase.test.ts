const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecation warning", () => {
  it("should emit a deprecation warning when a deprecated function is called", () => {
    // First verify Q is loaded correctly
    expect(Q).toBeDefined();
    expect(typeof Q.deprecate).toBe('function');

    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const deprecatedFn = Q.deprecate(() => "result", "oldFunction", "newFunction");
    deprecatedFn();
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });
});