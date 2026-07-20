const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should not warn when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-expect-error - intentionally deleting console for test
    delete global.console;

    const mockCallback = jest.fn(() => "result");
    // Access the deprecate function from the Q module's internal scope
    const deprecate = Q().constructor("return this")().deprecate;
    const deprecatedFunc = deprecate(mockCallback, "testFunc", "newFunc");

    const result = deprecatedFunc();
    expect(result).toBe("result");
    expect(mockCallback).toHaveBeenCalled();

    global.console = originalConsole;
  });
});