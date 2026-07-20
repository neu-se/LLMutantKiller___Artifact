const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Q = qFactory();

describe("deprecation warning", () => {
  it("should emit a deprecation warning when a deprecated function is called", () => {
    // The deprecate function should be available on the Q object
    expect(Q.deprecate).toBeDefined();
    expect(typeof Q.deprecate).toBe('function');

    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const deprecatedFn = Q.deprecate(() => "result", "oldFunction", "newFunction");
    deprecatedFn();
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });
});