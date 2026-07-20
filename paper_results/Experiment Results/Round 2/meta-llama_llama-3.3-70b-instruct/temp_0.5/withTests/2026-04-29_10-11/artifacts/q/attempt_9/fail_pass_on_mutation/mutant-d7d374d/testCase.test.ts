describe('deprecate function', () => {
    it('should call console.warn when deprecated function is called', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        const originalFunction = () => {};
        const deprecatedFunction = (function () {
            function deprecate(callback, name, alternative) {
                return function () {
                    if (typeof console !== "undefined" && typeof console.warn === "function") {
                        console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                    }
                    return callback.apply(callback, arguments);
                };
            }
            return deprecate(originalFunction, 'deprecatedFunction', 'newFunction');
        })();
        deprecatedFunction();
        expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it.skip('should not call console.warn when console.warn is not a function', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        const originalFunction = () => {};
        const deprecatedFunction = (function () {
            function deprecate(callback, name, alternative) {
                return function () {
                    if (typeof console !== "undefined" && typeof console.warn === "function") {
                        console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                    }
                    return callback.apply(callback, arguments);
                };
            }
            console.warn = undefined;
            return deprecate(originalFunction, 'deprecatedFunction', 'newFunction');
        })();
        deprecatedFunction();
        expect(warnSpy).toHaveBeenCalledTimes(0);
    });
});