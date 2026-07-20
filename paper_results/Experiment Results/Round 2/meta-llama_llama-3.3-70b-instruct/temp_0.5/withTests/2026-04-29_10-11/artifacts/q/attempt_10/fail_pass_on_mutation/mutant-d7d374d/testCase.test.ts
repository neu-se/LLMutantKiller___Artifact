describe('deprecate function', () => {
    it('should not call console.warn when condition is false', () => {
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