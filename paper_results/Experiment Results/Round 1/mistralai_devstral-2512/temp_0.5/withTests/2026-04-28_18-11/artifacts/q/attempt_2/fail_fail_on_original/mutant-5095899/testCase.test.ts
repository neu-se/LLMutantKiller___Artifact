describe("Q library initialization", () => {
    it("should initialize Q when self is defined but window is not", () => {
        // Save the original global objects
        const originalWindow = global.window;
        const originalSelf = global.self;
        const originalQ = global.Q;

        // Clean up after the test
        afterAll(() => {
            global.window = originalWindow;
            global.self = originalSelf;
            global.Q = originalQ;
        });

        // Set up environment where self exists but window doesn't
        delete global.window;
        global.self = global;

        // Load Q in this environment
        require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Verify Q was initialized
        expect(global.Q).toBeDefined();
        expect(typeof global.Q).toBe("function");

        // Test that Q works
        const promise = global.Q.resolve(42);
        expect(promise.isFulfilled()).toBe(true);
    });
});