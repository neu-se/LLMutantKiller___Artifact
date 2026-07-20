import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should log a deprecation warning when console is defined', () => {
        // Create a spy for the console.warn function
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        // Call the deprecated function
        const deprecatedFunction = function () {};
        deprecatedFunction.deprecate = function (callback, name, alternative) {
            if (typeof console !== "undefined" && typeof console.warn === "function") {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
            }
            return callback;
        };
        const wrappedFunction = deprecatedFunction.deprecate(function () {}, 'testFunction', 'newFunction');
        wrappedFunction();

        // Check if the deprecation warning was logged
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith('testFunction is deprecated, use newFunction instead.', expect.any(Error));

        // Restore the original console.warn function
        console.warn = originalWarn;
    });

    it('should log a deprecation warning when console is undefined', () => {
        // Create a spy for the console.warn function
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = undefined;

        // Call the deprecated function
        const deprecatedFunction = function () {};
        deprecatedFunction.deprecate = function (callback, name, alternative) {
            if (true && typeof console !== "undefined" && typeof console.warn === "function") {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
            }
            return callback;
        };
        const wrappedFunction = deprecatedFunction.deprecate(function () {}, 'testFunction', 'newFunction');
        wrappedFunction();

        // Check if the deprecation warning was logged
        expect(warnSpy).toHaveBeenCalledTimes(1);

        // Restore the original console.warn function
        console.warn = originalWarn;
    });
});