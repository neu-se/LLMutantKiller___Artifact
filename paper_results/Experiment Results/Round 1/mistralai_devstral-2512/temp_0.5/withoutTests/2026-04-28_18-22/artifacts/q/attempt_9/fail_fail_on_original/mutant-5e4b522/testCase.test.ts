// Test case to detect the mutation in q.js
describe("Q library initialization", () => {
    it("should properly detect browser environment with window object", () => {
        // Create a mock browser-like environment
        const globalObj = {
            window: {},
            self: {}
        };

        // Track whether the browser environment check passed
        let browserCheckPassed = false;

        // Execute the Q library code in this environment
        (function (definition) {
            // This is the line we're testing - using the original condition
            if (typeof globalObj.window !== "undefined" || typeof globalObj.self !== "undefined") {
                browserCheckPassed = true;
                const previousQ = (globalObj as any).Q;
                (globalObj as any).Q = definition();
                (globalObj as any).Q.noConflict = function () {
                    (globalObj as any).Q = previousQ;
                    return this;
                };
            }
        })(function () {
            return {
                noConflict: function() {
                    return this;
                }
            };
        });

        // The original condition should pass (window is defined)
        expect(browserCheckPassed).toBe(true);

        // Now test the mutated condition directly
        const mutatedCondition = typeof globalObj.window !== "" || typeof globalObj.self !== "undefined";
        // In mutated version, typeof window !== "" should be false (since typeof returns "object")
        // So the mutated condition should be false
        expect(mutatedCondition).toBe(false);
    });
});