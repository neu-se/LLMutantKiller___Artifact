describe("deprecate function", () => {
    it("should call console.warn only when console is defined", () => {
        const originalConsole = global.console;
        global.console = undefined;
        const callback = jest.fn();
        const name = "test";
        const alternative = "alternative";
        const deprecatedCallback = (function () {
            return function deprecate(callback, name, alternative) {
                return function () {
                    if (typeof console !== "undefined" && console.warn) {
                        console.warn(name + " is deprecated, use " + alternative + " instead.");
                    }
                    return callback.apply(callback, arguments);
                };
            };
        })();
        const wrappedCallback = deprecatedCallback(callback, name, alternative);
        wrappedCallback();
        expect(callback).toHaveBeenCalledTimes(1);
        global.console = originalConsole;
    });
});