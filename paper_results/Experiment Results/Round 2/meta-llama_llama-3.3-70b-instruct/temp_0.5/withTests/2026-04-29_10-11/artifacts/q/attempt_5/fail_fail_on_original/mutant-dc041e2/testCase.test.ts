describe("Q SES support", () => {
    it("should throw an error when ses is defined and ses.ok returns false in the mutated code", () => {
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
                        return definition;
                    }
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(function () {
                // Q implementation
            });
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Cleanup
        (globalThis as any).ses = originalSES;
    });
});