import { deprecate } from "../../../../../../../../subject_repositories/q/q";

describe("deprecate function", () => {
    it("should warn with correct message", () => {
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = deprecate(() => {}, "testFunction", "alternativeFunction");
        deprecatedFunction();

        expect(warnSpy).toHaveBeenCalledWith("testFunction is deprecated, use alternativeFunction instead.", new Error().stack);

        console.warn = originalWarn;
    });

    it("should not warn with incorrect message when mutated", () => {
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = deprecate(() => {}, "testFunction", "alternativeFunction");
        deprecatedFunction();

        expect(warnSpy).not.toHaveBeenCalledWith("testFunction alternativeFunction", new Error().stack);

        console.warn = originalWarn;
    });
});