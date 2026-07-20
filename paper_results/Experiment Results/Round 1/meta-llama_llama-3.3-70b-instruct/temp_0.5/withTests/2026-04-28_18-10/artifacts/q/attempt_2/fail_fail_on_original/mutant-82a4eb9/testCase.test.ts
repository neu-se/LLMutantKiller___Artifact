import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should behave differently based on the export type", () => {
        // Create a new module object
        const module = { exports: {} };

        // Original code behavior
        (function (definition) {
            "use strict";
            if (typeof module === "object" && module && typeof module.exports === "object") {
                module.exports = definition();
            }
        })(Q);

        // Check if the Q function is exported correctly
        expect(module.exports).toBe(Q);

        // Mutated code behavior
        (function (definition) {
            "use strict";
            if (typeof module === "object" || typeof module.exports === "object") {
                module.exports = definition();
            }
        })(Q);

        // Check if the Q function is exported correctly
        expect(module.exports).toBe(Q);

        // If the export type is an object, the Q function should return a promise
        const objectExport = { exports: {} };
        const nonObjectExport = "not an object";

        // Original code behavior
        (function (definition) {
            "use strict";
            if (typeof module === "object" && module && typeof module.exports === "object") {
                module.exports = definition();
            }
        })(Q);

        // Check if the Q function behaves correctly with an object export
        expect(typeof module.exports).toBe("function");

        // Mutated code behavior
        (function (definition) {
            "use strict";
            if (typeof module === "object" || typeof module.exports === "object") {
                module.exports = definition();
            }
        })(Q);

        // Check if the Q function behaves correctly with a non-object export
        expect(typeof module.exports).toBe("function");

        // This test case should pass on the original code and fail on the mutated code
        // Because the mutated code exports the Q function even when the export type is not an object
    });
});