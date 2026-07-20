describe("Q", () => {
    it("should log a deprecation warning when using a deprecated function", () => {
        const originalWarn = console.warn;
        console.warn = jest.fn();
        const callback = () => {};
        const alternative = "newFunction";
        const name = "oldFunction";
        const deprecatedFunction = function () {
            if (typeof console.warn === "function") {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
            }
            return callback();
        };
        deprecatedFunction();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(name + " is deprecated, use " + alternative + " instead.", expect.any(Error));
        console.warn = originalWarn;
    });
});