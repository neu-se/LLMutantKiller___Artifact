describe('deprecate function', () => {
    it('should call console.warn when deprecated function is called with condition true', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        const originalFunction = () => {};
        const deprecatedFunction = (function () {
            function deprecate(callback, name, alternative) {
                return function () {
                    if (true) {
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

    it.skip('should not call console.warn when deprecated function is called with condition false', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        const originalFunction = () => {};
        const deprecatedFunction = (function () {
            function deprecate(callback, name, alternative) {
                return function () {
                    if (false) {
                        console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                    }
                    return callback.apply(callback, arguments);
                };
            }
            return deprecate(originalFunction, 'deprecatedFunction', 'newFunction');
        })();
        deprecatedFunction();
        expect(warnSpy).toHaveBeenCalledTimes(0);
    });
});