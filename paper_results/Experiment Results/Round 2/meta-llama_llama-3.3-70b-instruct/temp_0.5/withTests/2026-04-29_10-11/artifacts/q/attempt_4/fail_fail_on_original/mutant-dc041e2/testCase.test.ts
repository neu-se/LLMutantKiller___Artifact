describe("Q SES support", () => {
    it("should return Q when ses is not defined", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        delete (globalThis as any).ses;

        // Act
        const result = (function (definition) {
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
        expect(result).toBeDefined();

        // Cleanup
        (globalThis as any).ses = originalSES;
    });

    it("should return ses.makeQ when ses is defined and ses.ok returns true", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => true, makeQ: jest.fn() };

        // Act
        const result = (function (definition) {
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
        expect((globalThis as any).ses.makeQ).toHaveBeenCalledTimes(1);

        // Cleanup
        (globalThis as any).ses = originalSES;
    });

    it("should return Q when ses is defined and ses.ok returns false", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => false };

        // Act
        const result = (function (definition) {
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
        expect(result).toBeDefined();

        // Cleanup
        (globalThis as any).ses = originalSES;
    });
});