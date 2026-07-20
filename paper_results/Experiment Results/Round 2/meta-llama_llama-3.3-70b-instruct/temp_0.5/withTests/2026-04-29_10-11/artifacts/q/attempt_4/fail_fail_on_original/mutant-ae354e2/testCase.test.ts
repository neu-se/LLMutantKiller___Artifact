import { Q } from '../../q';

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it("deprecate function should warn with correct message", () => {
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "alternativeFunction");
        deprecatedFunction();

        expect(warnSpy).toHaveBeenCalledWith("testFunction is deprecated, use alternativeFunction instead.", new Error().stack);

        console.warn = originalWarn;
    });

    it("deprecate function should not warn with incorrect message when mutated", () => {
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "alternativeFunction");
        deprecatedFunction();

        expect(warnSpy).not.toHaveBeenCalledWith("testFunction alternativeFunction", new Error().stack);

        console.warn = originalWarn;
    });
});