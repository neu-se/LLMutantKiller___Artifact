import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should print a deprecation warning to the console when using a deprecated function", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = function () { };
        if (q.deprecate) {
            const wrapper = q.deprecate(deprecatedFunction, "testFunction", "newFunction");
            wrapper();
            expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        } else {
            expect(true).toBe(false);
        }
    });

    it("should not print a deprecation warning to the console when using a deprecated function in a non-verbose environment", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        const deprecatedFunction = function () { };
        if (q.deprecate) {
            const wrapper = q.deprecate(deprecatedFunction, "testFunction", "newFunction");
            console.warn = jest.fn();
            wrapper();
            expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
        } else {
            expect(true).toBe(false);
        }
    });
});