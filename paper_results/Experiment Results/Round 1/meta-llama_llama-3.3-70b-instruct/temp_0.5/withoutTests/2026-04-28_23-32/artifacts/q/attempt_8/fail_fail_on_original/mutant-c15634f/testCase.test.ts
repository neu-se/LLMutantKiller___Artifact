import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("deprecate function", () => {
    it("should log a deprecation warning when called and console.warn is defined", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();
        const deprecatedFunction = function () {
            return function deprecate(callback: () => void, name: string, alternative: string) {
                if (typeof console.warn === "function") {
                    console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                }
                return callback;
            };
        };
        const deprecateFunction = deprecatedFunction();
        deprecateFunction(() => {}, "testFunction", "newFunction")();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
        console.warn = originalConsoleWarn;
    });

    it("should not log a deprecation warning when called and console.warn is not defined", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const originalConsoleWarn = console.warn;
        (console as any).warn = undefined;
        const deprecatedFunction = function () {
            return function deprecate(callback: () => void, name: string, alternative: string) {
                if (typeof console.warn === "function") {
                    console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                }
                return callback;
            };
        };
        const deprecateFunction = deprecatedFunction();
        deprecateFunction(() => {}, "testFunction", "newFunction")();
        expect(consoleWarnSpy).not.toHaveBeenCalled();
        console.warn = originalConsoleWarn;
    });
});