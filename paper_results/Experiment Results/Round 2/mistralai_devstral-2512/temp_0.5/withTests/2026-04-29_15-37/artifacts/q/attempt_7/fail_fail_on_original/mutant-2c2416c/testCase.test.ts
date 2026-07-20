const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should include 'instead.' in the deprecation warning message", () => {
    // Access the internal deprecate function through the module
    const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const qInstance = qFactory();
    const deprecate = qInstance.deprecate;

    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const callback = jest.fn();
    const deprecatedFunction = deprecate(callback, "oldFunction", "newFunction");

    deprecatedFunction();

    // Check that the warning contains " instead."
    const warnCalls = consoleWarnSpy.mock.calls;
    const warningMessage = warnCalls[0][0];

    expect(warningMessage).toContain("oldFunction");
    expect(warningMessage).toContain("newFunction");
    expect(warningMessage).toContain(" instead.");

    consoleWarnSpy.mockRestore();
  });
});