describe("Q.deprecate", () => {
    it("should log a deprecation warning when using a deprecated function", () => {
        const originalWarn = console.warn;
        console.warn = jest.fn();
        const callback = () => {};
        const alternative = "newFunction";
        const name = "oldFunction";
        const deprecatedFunction = function deprecate(callback: any, name: string, alternative: string) {
            if (typeof console.warn === "function") {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
            }
            return function () {
                return callback.apply(callback, arguments);
            };
        };
        const wrappedCallback = deprecatedFunction(callback, name, alternative);
        wrappedCallback();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(name + " is deprecated, use " + alternative + " instead."), expect.any(Error));
        console.warn = originalWarn;
    });
});