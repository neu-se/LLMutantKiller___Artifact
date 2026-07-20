const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function warning message", () => {
    it("should include 'instead.' in the deprecation warning message", () => {
        // Access the internal deprecate function through the module
        const moduleExports = require("../../../../../../../../../../../subject_repositories/q/q.js");
        const deprecate = moduleExports.deprecate || (() => {
            // Extract deprecate from the module factory if not directly exported
            const Q = qFactory();
            return Q.deprecate;
        })();

        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const testFn = jest.fn().mockReturnValue("test result");
        const deprecatedFn = deprecate(testFn, "oldFunction", "newFunction");

        deprecatedFn();

        expect(consoleWarnSpy).toHaveBeenCalled();
        const warningMessage = consoleWarnSpy.mock.calls[0][0];
        expect(warningMessage).toContain("oldFunction");
        expect(warningMessage).toContain("newFunction");
        expect(warningMessage).toContain("instead.");

        consoleWarnSpy.mockRestore();
    });
});