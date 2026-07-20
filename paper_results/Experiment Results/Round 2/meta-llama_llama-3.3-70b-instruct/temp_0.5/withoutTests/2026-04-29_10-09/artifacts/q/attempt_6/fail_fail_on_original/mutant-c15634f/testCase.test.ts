import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should print a deprecation warning to the console when using a deprecated function", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        Q(function () { 
            const deprecatedWrapper = function () { 
                if (typeof console !== "undefined" && typeof console.warn === "function") {
                    console.warn("testFunction is deprecated, use newFunction instead.", new Error().stack);
                }
            };
            deprecatedWrapper();
        })();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });

    it("should not print a deprecation warning to the console when using a deprecated function in a non-verbose environment", () => {
        const consoleWarnSpy = jest.spyOn(console, "warn");
        Q(function () { 
            const deprecatedWrapper = function () { 
                if (false) {
                    console.warn("testFunction is deprecated, use newFunction instead.", new Error().stack);
                }
            };
            deprecatedWrapper();
        })();
        expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    });
});