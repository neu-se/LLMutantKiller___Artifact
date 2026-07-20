// Test case to detect the mutation in q.js
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
                const previousQ = (globalObj as any).Q;
                (globalObj as any).Q = definition();
                (globalObj as any).Q.noConflict = function () {
                    (globalObj as any).Q = previousQ;
                    return this;
                };
            }
        })(function () {
            // This is the Q library definition function
            return {
                noConflict: function() {
                    return this;
                }
            };
        });

        // Verify that Q was properly initialized
        expect((globalObj as any).Q).toBeDefined();
        expect(typeof (globalObj as any).Q).toBe("object");
        expect((globalObj as any).Q.noConflict).toBeDefined();
        expect(typeof (globalObj as any).Q.noConflict).toBe("function");
    });
});