const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecated Q.allResolved", () => {
  it("should not throw error when console is undefined", () => {
    const originalConsole = global.console;
    // @ts-expect-error - intentionally deleting console for test
    delete global.console;

    // Q.allResolved is deprecated and uses the deprecate function internally
    expect(() => {
      Q.allResolved([Promise.resolve(1)]);
    }).not.toThrow();

    global.console = originalConsole;
  });
});