// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library global object detection", () => {
    it("should expose Q as a global when only window is defined", () => {
        // Save the original global objects
        const originalWindow = (global as any).window;
        const originalSelf = (global as any).self;
        const originalQ = (global as any).Q;

        // Delete any existing Q global and set up the test environment
        delete (global as any).Q;
        (global as any).window = {}; // window is defined
        delete (global as any).self; // self is completely undefined

        // Clear the require cache to force a fresh load of the module
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

        // Load Q which should expose itself as a global
        const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Verify Q is exposed as a global
        expect((global as any).Q).toBeDefined();
        expect((global as any).Q).toBe(QModule);

        // Clean up
        (global as any).window = originalWindow;
        (global as any).self = originalSelf;
        (global as any).Q = originalQ;
    });
});