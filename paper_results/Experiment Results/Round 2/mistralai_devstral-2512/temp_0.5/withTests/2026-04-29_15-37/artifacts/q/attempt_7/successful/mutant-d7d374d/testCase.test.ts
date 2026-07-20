const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function console check", () => {
    it("should not throw when console is undefined and using deprecated function", () => {
        const originalConsole = global.console;
        (global as any).console = undefined;

        expect(() => {
            Q.allResolved([Q(1)]);
        }).not.toThrow();

        global.console = originalConsole;
    });
});