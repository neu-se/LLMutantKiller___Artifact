describe("deprecate function", () => {
    it("should call console.warn with the correct message", () => {
        const callback = jest.fn();
        const name = "test";
        const alternative = "alternative";
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();
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
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(`${name} is deprecated, use ${alternative} instead.`);
        console.warn = originalConsoleWarn;
    });
});