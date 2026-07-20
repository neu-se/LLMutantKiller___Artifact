const Q = require("./q");

describe("deprecate function", () => {
  it("should not warn when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-expect-error - intentionally deleting console for test
    delete global.console;

    const mockCallback = jest.fn(() => "result");
    const deprecatedFunc = Q.deprecate(mockCallback, "testFunc", "newFunc");

    const result = deprecatedFunc();
    expect(result).toBe("result");
    expect(mockCallback).toHaveBeenCalled();

    global.console = originalConsole;
  });
});