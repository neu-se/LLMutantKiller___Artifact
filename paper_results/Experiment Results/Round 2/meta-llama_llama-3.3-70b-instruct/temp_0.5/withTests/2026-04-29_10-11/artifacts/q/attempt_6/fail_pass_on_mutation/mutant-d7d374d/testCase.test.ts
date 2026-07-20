describe('deprecate function', () => {
    it('should call console.warn when deprecated function is called', () => {
        const warnSpy = jest.spyOn(console, 'warn');
        const originalFunction = () => {};
        const deprecatedFunction = (function () {
            "use strict";
            var hasStacks = false;
            try {
                throw new Error();
            } catch (e) {
                hasStacks = !!e.stack;
            }
            var qStartingLine = (function () {
                try {
                    throw new Error();
                } catch (e) {
                    return e.stack.indexOf("q.js") - 7;
                }
            })();
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
});