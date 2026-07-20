describe("deprecate function", () => {
    it("should warn with correct message", () => {
        const Q = require('../../q.js');
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "alternativeFunction");
        deprecatedFunction();

        expect(warnSpy).toHaveBeenCalledWith("testFunction is deprecated, use alternativeFunction instead.", new Error().stack);

        console.warn = originalWarn;
    });

    it("should fail when mutated", () => {
        const Q = require('../../q.js');
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "alternativeFunction");
        deprecatedFunction();

        expect(warnSpy).not.toHaveBeenCalledWith("testFunction alternativeFunction", new Error().stack);

        console.warn = originalWarn;
    });
});