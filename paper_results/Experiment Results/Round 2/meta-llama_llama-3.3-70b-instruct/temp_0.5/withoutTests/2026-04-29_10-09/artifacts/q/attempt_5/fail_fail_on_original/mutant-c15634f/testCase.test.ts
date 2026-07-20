import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not print a deprecation warning to the console when using a deprecated function in a non-verbose environment", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        Q(function () { 
            const originalConsole = console;
            console = { warn: jest.fn() };
            const deprecatedWrapper = function () { 
                if (typeof console !== "undefined" && typeof console.warn === "function") {
                    console.warn("testFunction is deprecated, use newFunction instead.", new Error().stack);
                }
            };
            deprecatedWrapper();
            console = originalConsole;
        })();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    });

    it("should print a deprecation warning to the console when using a deprecated function", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        Q(function () { 
            const originalConsole = console;
            console = { warn: jest.fn() };
            const deprecatedWrapper = function () { 
                if (true) {
                    console.warn("testFunction is deprecated, use newFunction instead.", new Error().stack);
                }
            };
            deprecatedWrapper();
            console = originalConsole;
        })();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    });
});