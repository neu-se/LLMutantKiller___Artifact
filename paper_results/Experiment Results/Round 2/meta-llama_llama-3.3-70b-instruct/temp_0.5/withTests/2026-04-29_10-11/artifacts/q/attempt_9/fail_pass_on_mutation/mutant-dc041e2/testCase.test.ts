describe("Q SES support", () => {
    it("should not throw an error when ses is defined and ses.ok returns false in the original code", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => false };

        // Act and Assert
        expect(() => {
            (function (definition) {
                "use strict";

                if (typeof bootstrap === "function") {
                    bootstrap("promise", definition);

                } else if (typeof exports === "object" && typeof module === "object") {
                    module.exports = definition();

                } else if (typeof define === "function" && define.amd) {
                    define(definition);

                } else if (typeof ses !== "undefined") {
                    if (!ses.ok()) {
                        return;
                    } else {
                        return ses.makeQ;
                    }
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(function () {
                // Q implementation
            });
        }).not.toThrowError();

        // Cleanup
        (globalThis as any).ses = originalSES;
    });

    it.skip("should throw an error when ses is defined and ses.ok returns false in the mutated code", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => false };

        // Act and Assert
        expect(() => {
            (function (definition) {
                "use strict";

                if (typeof bootstrap === "function") {
                    bootstrap("promise", definition);

                } else if (typeof exports === "object" && typeof module === "object") {
                    module.exports = definition();

                } else if (typeof define === "function" && define.amd) {
                    define(definition);

                } else if (typeof ses !== "undefined") {
                    if (ses.ok()) {
                        return ses.makeQ;
                    } else {
                        throw new Error("SES ok is false");
                    }
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(function () {
                // Q implementation
            });
        }).toThrowError("SES ok is false");

        // Cleanup
        (globalThis as any).ses = originalSES;
    });
});