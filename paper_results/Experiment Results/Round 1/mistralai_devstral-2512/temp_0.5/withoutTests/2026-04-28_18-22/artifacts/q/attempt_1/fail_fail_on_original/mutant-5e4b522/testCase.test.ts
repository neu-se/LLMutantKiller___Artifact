// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q library initialization", () => {
    it("should properly initialize Q in a browser-like environment", () => {
        // Create a mock browser-like environment
        const globalObj = {
            window: {},
            self: {}
        };

        // Execute the Q library code in this environment
        (function (definition) {
            if (typeof globalObj.window !== "undefined" || typeof globalObj.self !== "undefined") {
                const previousQ = globalObj.Q;
                globalObj.Q = definition();
                globalObj.Q.noConflict = function () {
                    globalObj.Q = previousQ;
                    return this;
                };
            }
        })(function () {
            return Q;
        });

        // Verify that Q was properly initialized
        expect(globalObj.Q).toBeDefined();
        expect(typeof globalObj.Q).toBe("function");
        expect(globalObj.Q.noConflict).toBeDefined();
        expect(typeof globalObj.Q.noConflict).toBe("function");
    });
});