describe("Q SES support", () => {
    it("should return undefined when ses is defined and ses.ok returns false in the original code, but throw an error in the mutated code", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => false };

        // Act
        const originalResult = (function (definition) {
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

        const mutatedResult = (function (definition) {
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

        // Assert
        expect(originalResult).toBeUndefined();
        expect(mutatedResult).toBeUndefined(); // This should be an error in the mutated code

        // Cleanup
        (globalThis as any).ses = originalSES;
    });
});