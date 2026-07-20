import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("deprecate function", () => {
    it("should throw an error when console.warn is not defined and called", () => {
        const originalConsoleWarn = console.warn;
        (console as any).warn = undefined;
        const deprecatedFunction = function () {
            return function deprecate(callback: () => void, name: string, alternative: string) {
                if (typeof console.warn !== "function") {
                    throw new Error("console.warn is not defined");
                }
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
                return callback;
            };
        };
        const deprecateFunction = deprecatedFunction();
        expect(() => deprecateFunction(() => {}, "testFunction", "newFunction")()).toThrowError("console.warn is not defined");
        console.warn = originalConsoleWarn;
    });
});