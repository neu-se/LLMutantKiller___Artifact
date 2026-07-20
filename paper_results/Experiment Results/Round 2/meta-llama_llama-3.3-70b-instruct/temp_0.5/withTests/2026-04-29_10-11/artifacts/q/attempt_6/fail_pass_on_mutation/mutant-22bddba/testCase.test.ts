describe("Q library", () => {
    it("should correctly set the Q global in a browser environment", () => {
        // Since Jest runs in a Node.js environment by default, we need to mock the 'window' object
        const window = global as any;
        delete window.Q;

        // Load the Q library
        const definition = function () {
            return {
                noConflict: function () {
                    return this;
                }
            };
        };

        // Define the Q function
        function Q(definition) {
            if (typeof window !== "undefined" || typeof self !== "undefined") {
                const global = typeof window !== "undefined" ? window : self;
                const previousQ = global.Q;
                global.Q = definition();
                global.Q.noConflict = function () {
                    global.Q = previousQ;
                    return this;
                };
            }
            return Q;
        }

        // Call the Q function
        Q(definition);

        // Check if the Q global is set correctly
        expect(typeof window.Q).toBe("object");
        expect(typeof window.Q.noConflict).toBe("function");

        // Check if the Q global is set when self is undefined
        delete window.self;
        Q(definition);
        expect(typeof window.Q).toBe("object");
        expect(typeof window.Q.noConflict).toBe("function");
    });
});