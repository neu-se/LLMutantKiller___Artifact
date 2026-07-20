describe("Q initialization in self-only environment", () => {
    it("should initialize Q when only self is available (not window)", () => {
        // Save original globals
        const originalWindow = global.window;
        const originalSelf = global.self;

        // Clean up
        afterAll(() => {
            global.window = originalWindow;
            global.self = originalSelf;
        });

        // Set up environment where only self exists (no window)
        delete (global as any).window;
        (global as any).self = global;

        // Clear any existing Q
        delete (global as any).Q;

        // Load Q in this environment
        require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Verify Q was initialized (this will fail in mutated version)
        expect((global as any).Q).toBeDefined();
        expect(typeof (global as any).Q).toBe("function");

        // Test basic functionality
        const promise = (global as any).Q(42);
        expect(promise.isFulfilled()).toBe(true);
    });
});