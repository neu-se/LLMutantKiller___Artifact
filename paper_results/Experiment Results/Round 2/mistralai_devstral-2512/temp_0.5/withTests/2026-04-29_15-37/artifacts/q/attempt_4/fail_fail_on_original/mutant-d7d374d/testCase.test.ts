const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function console check", () => {
    it("should not throw when console is undefined", () => {
        const originalConsole = global.console;
        delete global.console;

        const testFn = () => "test";
        const deprecatedFn = Q.deprecate(testFn, "testFn", "newFn");

        expect(() => {
            deprecatedFn();
        }).not.toThrow();

        global.console = originalConsole;
    });
});