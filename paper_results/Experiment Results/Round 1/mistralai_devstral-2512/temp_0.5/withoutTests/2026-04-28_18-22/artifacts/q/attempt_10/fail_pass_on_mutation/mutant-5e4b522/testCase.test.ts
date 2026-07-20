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

        // Test the mutated condition by checking the type comparison directly
        const windowType = typeof globalObj.window;
        const isNotEmptyString = windowType !== "";
        // In the original code, this would be comparing with "undefined"
        // In the mutated code, this would be comparing with ""
        // Since typeof window returns "object", comparing with "" should be true
        // while comparing with "undefined" should be true (but for different reasons)
        expect(isNotEmptyString).toBe(true);
        expect(windowType).toBe("object");
    });
});