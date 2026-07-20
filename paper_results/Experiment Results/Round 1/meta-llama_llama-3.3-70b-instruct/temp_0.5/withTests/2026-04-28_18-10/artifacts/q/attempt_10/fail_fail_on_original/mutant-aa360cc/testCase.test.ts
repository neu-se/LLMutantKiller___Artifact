describe("Q", () => {
    it("should log a deprecation warning when using a deprecated function", () => {
        const originalWarn = console.warn;
        console.warn = jest.fn();
        const name = "oldFunction";
        const alternative = "newFunction";
        const deprecatedFunction = function () {
            if (typeof console.warn === "function") {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error().stack);
            }
        };
        deprecatedFunction();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(name + " is deprecated, use " + alternative + " instead."), expect.any(Error));
        console.warn = originalWarn;
    });
});