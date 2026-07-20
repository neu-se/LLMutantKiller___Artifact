import { Q } from "../../../../../../../../subject_repositories/q/q";

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

    it("deprecate function should throw an error when no alternative is provided", () => {
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = Q.deprecate(() => {}, "testFunction");
        expect(() => deprecatedFunction()).toThrowError("Q can't apply finally callback");

        console.warn = originalWarn;
    });
});