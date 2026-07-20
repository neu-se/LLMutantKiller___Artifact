// Test to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q library global object detection", () => {
    it("should expose Q as a global when window is defined but self is undefined", () => {
        // Save the original global objects
        const originalWindow = global.window;
        const originalSelf = global.self;
        const originalQ = global.Q;

        // Delete any existing Q global and set up the test environment
        delete global.Q;
        global.window = {}; // window is defined
        global.self = undefined; // self is undefined

        // Clear the require cache to force a fresh load of the module
        delete require.cache[require.resolve("./q.js")];

        // Load Q which should expose itself as a global
        const Q = require("./q.js");

        // Verify Q is exposed as a global
        expect(global.Q).toBeDefined();
        expect(global.Q).toBe(Q);

        // Clean up
        global.window = originalWindow;
        global.self = originalSelf;
        global.Q = originalQ;
    });
});