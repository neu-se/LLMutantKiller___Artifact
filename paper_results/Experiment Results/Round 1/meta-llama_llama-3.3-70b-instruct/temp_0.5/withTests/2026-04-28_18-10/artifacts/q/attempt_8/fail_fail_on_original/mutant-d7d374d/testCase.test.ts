describe("deprecate function", () => {
    it("should call console.warn with the correct condition", () => {
        const callback = jest.fn();
        const name = "test";
        const alternative = "alternative";
        const originalConsoleWarn = console.warn;
        console.warn = jest.fn();
        const deprecatedCallback = (function (callback: Function, name: string, alternative: string) {
            return function () {
                if (typeof console !== "undefined" && console.warn) {
                    console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                }
                return callback.apply(callback, arguments);
            };
        })(callback, name, alternative);
        deprecatedCallback();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(`${name} is deprecated, use ${alternative} instead.`);
        console.warn = originalConsoleWarn;
    });
});