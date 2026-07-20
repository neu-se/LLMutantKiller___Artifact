describe("deprecate function", () => {
    it("should log a deprecation warning with the correct message", () => {
        const Q = require('./q.js');
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = Q.deprecate(function() {}, "test", "newTest");
        deprecatedFunction();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith("test is deprecated, use newTest instead.", new Error("").stack);
    });
});