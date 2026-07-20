describe("deprecate function", () => {
    it("should call the callback with the correct arguments", () => {
        const callback = jest.fn();
        const name = "test";
        const alternative = "alternative";
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();
        const deprecatedCallback = (function () {
            return function deprecate(callback, name, alternative) {
                return function () {
                    console.warn(name + " is deprecated, use " + alternative + " instead.");
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