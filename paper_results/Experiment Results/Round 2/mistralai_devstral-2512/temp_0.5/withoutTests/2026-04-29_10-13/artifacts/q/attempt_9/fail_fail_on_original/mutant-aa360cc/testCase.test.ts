const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecation warning", () => {
  it("should emit a deprecation warning when a deprecated function is called", () => {
    // Access the deprecate function through the module's internal structure
    const deprecate = qModule.deprecate || (qModule.Q && qModule.Q.deprecate);

    expect(deprecate).toBeDefined();
    expect(typeof deprecate).toBe('function');

    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const deprecatedFn = deprecate(() => "result", "oldFunction", "newFunction");
    deprecatedFn();
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });
});