import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("deprecate function", () => {
    it("should log a deprecation warning when called and console.warn is defined", () => {
        const originalConsoleWarn = console.warn;
        const consoleWarnSpy = jest.fn();
        console.warn = consoleWarnSpy;
        const deprecatedFunction = q.deprecate(() => {}, "testFunction", "newFunction");
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
        console.warn = originalConsoleWarn;
    });

    it("should not log a deprecation warning when called and console.warn is not defined", () => {
        const originalConsoleWarn = console.warn;
        console.warn = undefined;
        const deprecatedFunction = q.deprecate(() => {}, "testFunction", "newFunction");
        deprecatedFunction();
        console.warn = originalConsoleWarn;
        const consoleWarnSpy = jest.spyOn(console, "warn");
        expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
});