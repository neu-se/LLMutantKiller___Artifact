import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("deprecate function", () => {
    it("should log a deprecation warning when called", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();
        const deprecatedFunction = function () {
            return Function('return (function (definition) { "use strict"; ... } )(function () { "use strict"; ... });').call(this, function () {
                return function deprecate(callback, name, alternative) {
                    console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                    return callback;
                };
            });
        };
        const deprecatedFunction2 = deprecatedFunction();
        const deprecateFunction = deprecatedFunction2.deprecate;
        deprecateFunction(function () {}, "testFunction", "newFunction")();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
        console.warn = originalConsoleWarn;
    });
});