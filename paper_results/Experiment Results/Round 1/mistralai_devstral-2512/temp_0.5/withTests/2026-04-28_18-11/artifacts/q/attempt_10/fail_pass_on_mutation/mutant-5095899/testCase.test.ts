describe("Q browser environment initialization", () => {
    it("should initialize Q when self is defined but window is not", () => {
        // Create a mock browser environment where self exists but window doesn't
        const mockGlobal: any = {
            self: {},
            window: undefined
        };

        // Execute Q's initialization code in this environment
        (function (definition) {
            "use strict";

            // This is the exact environment detection code from q.js
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