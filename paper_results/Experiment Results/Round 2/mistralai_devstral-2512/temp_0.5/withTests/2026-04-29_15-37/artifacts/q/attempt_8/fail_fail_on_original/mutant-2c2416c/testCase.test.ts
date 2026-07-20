const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should include 'instead.' in the deprecation warning message", () => {
    // Get the Q instance
    const Q = qFactory();

    // The deprecate function should be available on the Q instance
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const callback = jest.fn();
    const deprecatedFunction = Q.deprecate(callback, "oldFunction", "newFunction");

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