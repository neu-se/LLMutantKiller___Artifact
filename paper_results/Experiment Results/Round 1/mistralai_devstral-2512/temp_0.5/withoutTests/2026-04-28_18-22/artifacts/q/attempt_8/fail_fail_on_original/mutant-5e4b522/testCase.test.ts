// Test case to detect the mutation in q.js
describe("Q library initialization", () => {
    it("should fail when window type check is mutated", () => {
        // Create a mock browser-like environment
        const globalObj = {
            window: {},
            self: {}
        };

        // Track whether the browser environment check passed
        let browserCheckPassed = false;

        // Execute the Q library code in this environment
        (function (definition) {
            // This is the mutated line we're testing
            if (typeof globalObj.window !== "" || typeof globalObj.self !== "undefined") {
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

        // In the original code, typeof window !== "undefined" would be true
        // In the mutated code, typeof window !== "" should be false (since typeof returns "object")
        // So browserCheckPassed should be false in mutated version
        expect(browserCheckPassed).toBe(false);
    });
});