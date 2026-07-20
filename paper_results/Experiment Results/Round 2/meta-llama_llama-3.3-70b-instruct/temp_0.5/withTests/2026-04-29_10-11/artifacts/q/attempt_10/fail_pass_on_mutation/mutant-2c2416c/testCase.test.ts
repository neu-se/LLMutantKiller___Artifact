describe("deprecate function", () => {
    it("should log a deprecation warning with the correct message when the deprecated function is called", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = function () {
            console.warn("test is deprecated, use alternative instead.");
        };
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("test is deprecated, use alternative instead.");
    });
});