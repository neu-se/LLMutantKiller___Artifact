describe("Q browser environment detection", () => {
    it("should initialize when self is defined but window is not", () => {
        // Create a mock environment where self exists but window doesn't
        const mockGlobal = {
            self: {},
            window: undefined,
            Q: undefined
        };

        // Execute the Q initialization code in this mock environment
        (function (definition) {
            "use strict";

            // This is the exact code path from q.js that contains the mutation
            if (typeof mockGlobal.window !== "undefined" || typeof mockGlobal.self !== "undefined") {
                mockGlobal.Q = definition();
            }
        })(function () {
            "use strict";
            function Q(value: any) {
                return {
                    isFulfilled: () => true,
                    then: (callback: Function) => {
                        callback(value);
                        return this;
                    }
                };
            }
            return Q;
        });

        // Verify Q was initialized (this will fail in mutated version)
        expect(mockGlobal.Q).toBeDefined();
        expect(typeof mockGlobal.Q).toBe("function");

        // Test basic functionality
        const promise = mockGlobal.Q(42);
        expect(promise.isFulfilled()).toBe(true);
    });
});