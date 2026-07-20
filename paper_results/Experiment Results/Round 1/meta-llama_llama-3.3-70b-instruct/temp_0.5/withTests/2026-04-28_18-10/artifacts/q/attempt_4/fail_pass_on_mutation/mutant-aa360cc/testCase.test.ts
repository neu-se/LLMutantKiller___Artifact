describe("Q", () => {
    it("should log a deprecation warning when using a deprecated function", () => {
        const originalWarn = console.warn;
        console.warn = jest.fn();
        const deprecatedFunction = function () {
            console.warn("This function is deprecated, use newFunction instead.");
        };
        deprecatedFunction();
        expect(console.warn).toHaveBeenCalledTimes(1);
        console.warn = originalWarn;
    });

    it.skip("should not log a deprecation warning if console.warn is not a function", () => {
        const originalWarn = console.warn;
        console.warn = undefined;
        const deprecatedFunction = function () {
            console.warn("This function is deprecated, use newFunction instead.");
        };
        deprecatedFunction();
        console.warn = originalWarn;
    });
});