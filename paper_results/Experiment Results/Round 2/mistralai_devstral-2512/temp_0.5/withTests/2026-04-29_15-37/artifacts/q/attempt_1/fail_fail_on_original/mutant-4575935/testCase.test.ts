describe("Q global exposure in browser environment", () => {
    it("should expose Q as a global variable when window is defined", () => {
        // Simulate a browser environment by defining window
        const globalAny: any = global;
        const originalWindow = globalAny.window;
        const originalSelf = globalAny.self;
        const originalQ = globalAny.Q;

        // Clean up any existing Q global
        delete globalAny.Q;

        // Simulate browser environment
        globalAny.window = {};
        globalAny.self = undefined;

        // Load Q in this simulated environment
        const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Verify Q is exposed as a global
        expect(globalAny.Q).toBeDefined();
        expect(globalAny.Q).toBe(Q);

        // Clean up
        globalAny.window = originalWindow;
        globalAny.self = originalSelf;
        globalAny.Q = originalQ;
    });
});