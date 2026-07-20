describe("Q", () => {
    it("should log a deprecation warning with the stack trace when using a deprecated function", () => {
        const originalWarn = console.warn;
        console.warn = jest.fn();
        const deprecatedFunction = function () {
            console.warn("This function is deprecated, use newFunction instead.", new Error("").stack);
        };
        deprecatedFunction();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("This function is deprecated, use newFunction instead."), expect.any(Error));
        console.warn = originalWarn;
    });
});